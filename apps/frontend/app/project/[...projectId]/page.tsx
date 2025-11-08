'use client'
import React, { useEffect } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Eye, Code } from "lucide-react";
import axios from "axios";
import {use} from 'react'
import { useAuth } from "@clerk/clerk-react";

enum TabKey {
    Code = 'CODE',
    Preview = 'PREVIEW',
}


export default function Chat(){
<<<<<<< HEAD:apps/frontend/app/project/[projectId]/page.tsx
    const {projectId} = useParams<{projectId : string}>();
    const [prompt, setPrompt] = React.useState<string>("");
    const [tabState, changetabState] = React.useState<TabKey>(TabKey.Code)
=======
>>>>>>> 163fec9 (added pipeline to stream the llm response at frontend):apps/frontend/app/project/[...projectId]/page.tsx
    // 1.send prompt to worker 
    // 2.if preview is not ready set a loading screen
    // 3.send the llm talk to the user 


    const [tabState, changetabState] = React.useState<TabKey>(TabKey.Code)
    const {projectId} = useParams();
    const {getToken} = useAuth();



    async function RequestToLLM()
    {
<<<<<<< HEAD:apps/frontend/app/project/[projectId]/page.tsx
        try {
            // 1. fetch the prompt history of the user 
            // 2.extract the latest user prompt and feed it to llm
            const response  =await axios.post('http://localhost:8082/getPrompts',{
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
=======
        // fetch history of chats
        // if init == TRUE start a new conversation with the LLM 
        let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || '0', 10);

        try {


            if(projectId !== undefined){
                console.log(projectId);
                if(projectId[1] === 'TRUE' && reloadCount  ){
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
          
            }else{
                // 1.fetch the chat history from  the db and stream it to the user l
                
>>>>>>> 163fec9 (added pipeline to stream the llm response at frontend):apps/frontend/app/project/[...projectId]/page.tsx
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

    return (
        <div className="h-screen bg-[#101010] ">

        <ResizablePanelGroup direction="horizontal" className=" bg-[#1e1e21]">
            <ResizablePanel className="relative"    >
                <div className=" px-4 py-4 rounded-lg pl-10   absolute  bottom-0  right-2  w-full h-full  flex flex-col gap-4">

                    <div className="tools w-full h-14 bg-red-500 rounded-sm">

                            <h1>Tool bar </h1>
                    </div>


                    <div className="llm-response  p-4 w-full text-gray-500 rounded-md grow top-0 overflow-y-scroll no-scrollbar">
                        <p>
                            USER : {prompt}
                        </p>

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