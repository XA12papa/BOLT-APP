"use client"
import React from 'react'
import { Textarea } from './ui/textarea'    
import { Button } from './ui/button'
import axios from 'axios';
import { BorderBeam } from './ui/border-beam';
import { Vortex } from './ui/vortex';
import { TypingAnimation } from './ui/typing-animation';
import { useRouter } from 'next/navigation';
import { Highlighter } from "./ui/highlighter";
import { useAuth } from '@clerk/nextjs';


function HomePage() {
  const {getToken} = useAuth();
  const router = useRouter();

  async function getValue(){
    const textArea = document.getElementById('textArea') as HTMLInputElement
    const  token = await getToken();
    console.log(textArea.value);  


    try {
      if(!token){
        // route user to login / signup  page 
      }
      const  response = await axios.post("http://localhost:8082/project",{prompt : textArea.value},{headers: {Authorization: `Bearer ${token}`}});

      if(!response.data.id){

        // throw error response 
        return;
      }


      console.log(response.data);
      router.push(`/project/${response.data.id}?init=TRUE`)


    } catch (error) {
        // toast something went wrong 
    }

  }
     return (


          <Vortex  className=' flex w-full h-full  items-start justify-around absolute top-0   '>



              <div className='flex flex-col gap-2 mt-40 justify-center items-center h-ful'>

                <div className='flex flex-col justify-center items-center'>
                  <TypingAnimation className='text-white'>What should we build today?</TypingAnimation>
                  <p className='text-gray-400'> 
                    Create {" "}  
                    <Highlighter action="underline" color="#FF9800">
                   stunning  
                    </Highlighter>{" "}
                    apps & websites

                     by {" "}
                    <Highlighter action="highlight" color="#B8478A">
                      chatting with AI.
                    </Highlighter>
                      </p>
                </div>


                <div>
                      <div className='relative w-2xl overflow-hidden rounded-xl mt-15'>
                                    <Textarea id='textArea' placeholder='Type your idea and we will build it together ' className='  
                                    placeholder:text-gray-400
                                    
                                    placeholder:text-[0.8rem]
                                    placeholder:tracking-wider
                                    placeholder:font-roboto

                                    w-full
                                    rounded-lg
                                    border-none
                                    text-gray-100
                                    font-light
                                    !text-[1.2 rem]
                                    p-5
                                    backdrop-blur-sm 
                                    h-[9rem] 
                                    transition-all duration-300 ease-in-out 
                                    font-sans
                                    bg-[#1e2022]
                                    bg-opacity-65
                                    scroll-smooth
                                    ' />


                                    <BorderBeam duration={8} size={100} borderWidth={2} />
        
                            </div>
                      <Button className=' w-full bg-blue-400 text-xl mt-2   font-roboto font-semibold hover:bg-blue-500 border-none p-0 border-white'  onClick={()=>{getValue()}}>SUBMIT</Button>
                      
                </div>

              </div>
          </Vortex>

  
      )
}
    
    export default HomePage