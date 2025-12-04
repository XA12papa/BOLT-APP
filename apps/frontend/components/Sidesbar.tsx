"use client"

import React from 'react'
import {
    Drawer,
    DrawerContent,

  } from "@/components/ui/drawer"
import { Button } from "./ui/button"
import axios from 'axios'
import { Trash2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs'


interface projects{
    id :string,
    description :string,
    createdAt :string,
    updatedAt :string
}

function Sidesbar() {
    const [openState, changeOpenState] = React.useState(false); 
    const [position,setMousePosition] = React.useState({x:0,y:0});

    const [projects,setProjects] = React.useState<projects[] | []>([])
    const {getToken} = useAuth()


    async function handeleDeleteProject(){
        console.log("Deleting project")
    }
    
    
    React.useEffect(() => {
        const updateMousePosition = (e : MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        // Cleanup on unmount
        return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    React.useEffect(() => {
        if(position.x < 20 && !openState){
        changeOpenState(true)
        }if(position.x > 400 && openState){
        changeOpenState(false)
        }
    }, [position]);

    React.useEffect(() => {
        async function getProjects(){
            try {
                const token = await getToken();

                const response = await axios.get("http://localhost:8082/projects",{
                    headers :{
                        "authorization" : `Bearer ${token}  `
                    }
                });
                setProjects(response.data);
            } catch (error) {
                console.error(error);   
            }
        }

        getProjects();
    }, []);

  return (
    <Drawer direction="left" open={openState  }>
    <DrawerContent className='bg-[#171717] bx-px border-r-1 border-r-blue-400 rounded-r-2xl  z-[999] px-4'>
        <div className='  rounded-2xl  py-5'>
            <span className='text-2xl font-roboto font-bold text-white flex justify-start  items-center py-2'>Bolt</span>

            <Button className='drawer-button w-full  font-roboto  bg-blue-400 text-white   text-md p-0 px-3   flex items-center justify-center hover:bg -blue-500 rounded-sm my-3'><p className="w-full flex">Start a new chat </p></Button>
            
            <div className='w-full flex items-start justify-start  text-white py-3 font-roboto text-sm font-semibold gap-1'>
                Your Chats
            </div>  
            
            <div className='projects'>
                {
                    projects.map((project : projects,index : number) => (
                        <div key={index} className='flex flex-row items-center justify-between   container  hover:bg-gray-300/10 hover:text-white  py-1   rounded-sm '>
                        <Button key={index} className='drawer-button   text-gray-400  bg-transparent hover:bg-transparent rounded-sm p-0 px-2 overflow-hidden' ><p className='w-full flex items-start justify-between overflow-hidden max-w-64'>{project.description}</p></Button>
                        
                        <Button className='bg-transparent hover:bg-transperent hover:text-red-500' onClick={handeleDeleteProject}><Trash2/>  </Button>
                        </div>
                        
                    ))
                }   
            </div>

        </div>
    </DrawerContent>
  </Drawer>
  )
}

export default Sidesbar