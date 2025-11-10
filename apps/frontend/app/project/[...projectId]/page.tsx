'use client'
import React, { useEffect } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { Eye, Code } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";


import { streamLLMResponse } from "@/lib/streamLLMResponse"
import SyntaxHighlighter, { Prism } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs"


enum TabKey {
    Code = 'CODE',
    Preview = 'PREVIEW',
}
interface llm_response_type{
    data : string,
    type : 'CODE' | 'COMMAND' |'NONE',
    filepath ?: string,
 }


export default function Chat(){
    const params = useParams<{projectId: string[]}>();
    const projectId = params.projectId;
    const [prompt, setPrompt] = React.useState<string>("");
    const [tabState, changetabState] = React.useState<TabKey>(TabKey.Code);
    const {getToken} = useAuth();

    // pre llm request code 

    async function RequestToLLM()
    {
        try {
            // fetch history of chats
            // if init == TRUE start a new conversation with the LLM 
            let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || '0', 10);

            if(projectId !== undefined && Array.isArray(projectId)){
                console.log(projectId);
                if(projectId[1] === 'TRUE' && reloadCount){
                    // 1.using project If fetch the prompts of use 
                    // 2. give llm some prompt 
                    // 3. fetch the response from llm and stream it the  usr

                    const token = await getToken()
                    const prompts = await axios.post("http://localhost:8082/getPrompts",{projectId : projectId[0]},{headers: {Authorization: `Bearer ${token}`}});

                    if(!prompts || !prompts.data ){
                        // Toast a error message 
                        return;
                    }

                    const current_prompt = prompts?.data[0]?.prompt;

                    // send llm this prompt to process 
                }
            } else {
                // 1.fetch the chat history from  the db and stream it to the user
                // 1. fetch the prompt history of the user 
                // 2.extract the latest user prompt and feed it to llm
                const response = await axios.post('http://localhost:8082/getPrompts',{
                    projectId : projectId
                });

                const latestPrompt = response.data[response.data.length - 1]?.prompt;
                console.log(latestPrompt);

                if(latestPrompt !== undefined && latestPrompt !== null && latestPrompt !== ""){
                    // request to llm ;
                    console.log(latestPrompt);
                    const llmResponse = await axios.post('http://localhost:3002/prompt',{
                        prompt : latestPrompt,
                        projectId : projectId
                    });

                    console.log(llmResponse.data)
                }
            }
        } catch (error) {
            console.error(error)   
        }
    }


    useEffect(() =>{
        let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || '0', 10);
        reloadCount++;
        sessionStorage.setItem('reloadCount', reloadCount.toString());
        RequestToLLM(); 
    }, [])

    // pre llm request code 


    // post llm process


   const [llm_response, set_llm_response ] = React.useState<llm_response_type[] | []>([]);

   const wsRef = React.useRef<null | WebSocket>(null);
   const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);
   
   const isProcessingRef = React.useRef<boolean>(false);
   const messageQueueRef = React.useRef<any[]>([]);
   
   const WS_URL = 'ws://localhost:8083';


   const processMessage = React.useCallback(async (json_format: any) => {
    if (!json_format || json_format === null) {
       return;
    }

    let artifact = '';

    // Add new response item
    set_llm_response((prev) => [...prev, {...json_format, data: ''}]);
    
    // Stream the data chunk by chunk
    for await (const chunk of streamLLMResponse(json_format.data, 50)) {
       artifact += chunk;
       // console.log(artifact);
       
       // Update the last item with accumulated data
       set_llm_response((prev) => {
          if (prev.length === 0) return prev;
          const previous = prev.slice(0, -1);
          const lastItem = prev[prev.length - 1];
          return [...previous, {...lastItem, data: artifact}];
       });
    }
 }, []);


    const processQueue = React.useCallback(async () => {
        // If already processing, skip
        if (isProcessingRef.current) {
        return;
        }

        // If queue is empty, nothing to do
        if (messageQueueRef.current.length === 0) {
        return;
        }

        // Mark as processing
        isProcessingRef.current = true;

        try {
        // Get the first message from queue
        const json_format = messageQueueRef.current.shift();
        if (json_format) {
            await processMessage(json_format);
        }
        } finally {
        // Mark as not processing
        isProcessingRef.current = false;

        // Process next message in queue if any
        if (messageQueueRef.current.length > 0) {
            processQueue();
        }
        }
    }, [processMessage]);


    const connect = () => {
        wsRef.current = new WebSocket(WS_URL);
    
        wsRef.current.onopen = () => {
          console.log("✅ Connected to WebSocket server");
          if (reconnectTimeout.current) {
           clearTimeout(reconnectTimeout.current);
           reconnectTimeout.current = null;
          };
        };
    
        wsRef.current.onmessage = (event : MessageEvent) => {
           try {
              const json_format = JSON.parse(event.data);
  
              if (json_format !== undefined && json_format !== null) {
                 // Add message to queue
                 messageQueueRef.current.push(json_format);
                 
                 // Start processing queue (will process immediately if not busy, or queue it)
                 processQueue();
              }
           } catch (error) {
              console.log("ERROR : ", error);
           }
        };
    
        wsRef.current.onclose = () => {
          console.log("⚠️ Connection closed. Reconnecting in 3 seconds...");
          reconnectTimeout.current = setTimeout(connect, 3000); // try again after 3s
        };
    
        wsRef.current.onerror = (err) => {
          console.error("❌ WebSocket error:", err);
          wsRef?.current?.close(); // close to trigger reconnection
        };
      };


      React.useEffect(()=>{ 
        connect();
        
        
        return () =>{
           if(reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
           if(wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.close();
  
           }
        }
     },[])


    return (
        <div className="h-screen bg-[#101010] ">

        <ResizablePanelGroup direction="horizontal" className=" bg-[#1e1e21]">
            <ResizablePanel className="relative"    >
                <div className=" px-4 py-4 rounded-lg pl-10   absolute  bottom-0  right-2  w-full h-full  flex flex-col gap-4">

                    <div className="tools w-full h-14 bg-red-500 rounded-sm">

                            <h1>Tool bar </h1>
                    </div>


                    <div className="llm-response  p-4 w-full text-gray-500 rounded-md grow top-0 overflow-y-scroll no-scrollbar">
                        {
                             llm_response.map((val, index) =>{
                                if(val.type === 'NONE') return;
                                return(
                                   
                                   <div className="flex flex-col gap-2" key={index}>
                                   {/* <p>{val?.type}</p> */}
                                      {val?.filepath?(
                                            
                                         <SyntaxHighlighter language="javascript" style={dark}>
                                                  {val?.filepath}
                                         </SyntaxHighlighter>
                 
                                         ):''}
                 
                                         { }
                                         { }
                                         
                                         {/* <p  className="whitespace-pre-wrap" >{val?.data}</p> */}
                 
                                         <SyntaxHighlighter language="javascript" style={dark} >
                                                {val?.data}
                                         </SyntaxHighlighter>
                    
                 
                                   </div>
                                )
                             })
                        }
                    </div>


                    <div className="  bg-[#1e1e21] relative  rounded-lg  w-full" >

                            <Textarea id='textArea' placeholder='Type your idea and we will build it together ' className='  
                                            placeholder:text-gray-400
                                            
                                            placeholder:text-[1rem]
                                            placeholder:tracking-wider
                                            placeholder:font-roboto

                                            bg-[#333336]
                                            rounded-lg
                                            text-gray-100
                                            font-light
                                            !text-[1.2 rem]
                                            p-5
                                            backdrop-blur-sm 
                                            h-[8rem] 
                                            transition-all duration-300 ease-in-out 
                                            font-sans

                                            border-px
                                            border-gray-600
                                            focus-visible:ring-0 

                                            ' >

                                            </Textarea>
                                                    <BorderBeam
                                                duration={6}
                                                delay={3}
                                                size={200}
                                                borderWidth={3}
                                                className="from-transparent absolute via-blue-500 to-transparent"
                                            />


                                

                    </div>
                </div>
            </ResizablePanel>


            <ResizableHandle  className="bg-gray-800 hover:bg-gray-400 transition-all ease-in-out duration"/>
            
            
            <ResizablePanel className="px-4 ">
                <div className="py-2 h-screen ">
                    <Tabs defaultValue={TabKey.Code} onValueChange={(value)=>{ changetabState(value as TabKey) }}  className="w-full  h-full ">
                        <TabsList  className="bg-black scale-125">

                                <TabsTrigger  
                                value={TabKey.Code} 
                                className={cn(
                                    "  ",
                                    tabState === TabKey.Code ? "bg-[#192630]! text-blue-600 font-extrabold" : "bg-transparent text-gray-600"
                                
                                )} >

                                    <Code />

                                </TabsTrigger>

                                <TabsTrigger
                                 value={TabKey.Preview}
                                 className={cn(
                                    "  px-2 py-1",
                                    tabState === TabKey.Preview? "bg-[#192630]! text-blue-600 font-extrabold" : "bg-transparent text-gray-600"
                                
                                )}
                                 ><Eye/></TabsTrigger>
                        </TabsList>
                        <TabsContent value={TabKey.Code} className="h-screen relative">
                            <iframe className="w-full h-full rounded-md absolute bottom-0" src="http://localhost:8080"/>

                        </TabsContent>
                        <TabsContent value={TabKey.Preview}>
                         
                        <iframe
                            className="w-full h-screen rounded-md"
                            src="http://localhost:8080/proxy/8081/"
                            title="Local preview"
                            loading="lazy"
                            allow="clipboard-read; clipboard-write; fullscreen"
                            referrerPolicy="no-referrer"
                            />
</TabsContent>
                    </Tabs>
                </div>


            </ResizablePanel>
        </ResizablePanelGroup>
        </div>
    )
}