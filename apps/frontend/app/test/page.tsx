'use client'


import React from "react"
import {TypingAnimation}  from "@/components/ui/typing-animation"
import { streamLLMResponse } from "@/lib/streamLLMResponse"

interface llm_response_type{
   data : string,
   type : 'CODE' | 'COMMAND' |'NONE',
   filepath ?: string,
}

export default function page(){


   const [llm_response, set_llm_response ] = React.useState<llm_response_type[] | []>([]);

   const wsRef = React.useRef<null | WebSocket>(null);
   const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);
   
   const isProcessingRef = React.useRef<boolean>(false);
   const messageQueueRef = React.useRef<any[]>([]);

   const WS_URL = 'ws://localhost:8083';

   // Process a single message - streaming the data chunk by chunk
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

   // Process queue sequentially - ensures only one message processes at a time
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

   // React.useEffect(() => { 
   //    console.log(llm_response)
   // },[llm_response])


   return(
      <>
      <div className="flex flex-col">
         {/* {
            messsges.map((text,index) =>{
               return(
                  <p key={index}>
                     {index} : {text}
                  </p>
               )
            })
         } */}

         {
            llm_response.map((val, index) =>{
               if(val.type === 'NONE') return;
               return(
                  
                  <div className="flex flex-col">
                  <p>{val?.type}</p>
                     {val?.filepath?(
                           <p> ❤ {val.filepath}</p>
                        ):''}

                        { }
                        { }
                        
                        <p  className="whitespace-pre-wrap" >{val?.data}</p>
   

                  </div>
               )
            })
         }
      </div>
      </>
   )
}