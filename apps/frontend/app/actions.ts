"use server"

import { prismaClient } from "db/client";

interface project_api_type {
    success : boolean,
    data : any,
    message : string
}




export async function fetch_data_from_project(projectId : string) : Promise<project_api_type> {
    try {
        if(!projectId || typeof projectId !== "string" || projectId === "") return {success :false,data : null,message :"Error in projeceId"}

        
        const record =  await prismaClient.project.findUnique({
            where : {
                id : projectId
            },
        })
        if(!record)  return {success :false,data : null,message :"record is either null or undefined "};

        return {success :true,data : record,message :"successfully fetched the project data "}
    } catch (error) {
        console.log(error)
        return {success :false,data : null,message :"Error while fetcing record"};
    }
}   

export async function fetch_Projects_DB(){
    
}