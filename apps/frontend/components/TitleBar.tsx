"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { useAuth, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { ChevronDown ,ChevronRight} from "lucide-react";
import React from "react";
import { fetch_data_from_project } from "@/app/actions";
import { SquarePen ,Download ,FolderOpen} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Spinner } from "./ui/spinner";
import { MorphingText } from "./ui/morphine-text";



import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function TitleBar(params : any){



    const    [RenameState ,SetRenameState ] = React.useState<{projectId : string , projectName : string} | null>({projectId : "",projectName : ""});
    const [isLoaging , setIsLoading] = React.useState<boolean>(true);

    const [openState,changeOpenState] = React.useState<boolean>(false);
    const [searchState,ChangeSearchState] = React.useState<boolean>(false);


    const [projectArr,setProjectArr] = React.useState<{projectId:string,projectName : string}[] | []>([]);


    const {getToken} = useAuth();
    const router = useRouter();


    async function projectRoute(id : String){
        try {
            await   router.push(`/project/${id}?init=False`);

        } catch (error) {
                // give a toast messages    
                console.log(error)
        }   
    }

    React.useEffect(()=>{
        // self-invoking async fetcher
        const fetchProject = async function loadProject(){
            try {
                setIsLoading(false);
                const id = params?.projectId;
                if(id ===  null || id  === "" || typeof  id !== "string") return;

                const response = await fetch_data_from_project(id);
                console.log(response)

                if(response.success === false){
                    // Throw a toast message 
                    return 
                }
                SetRenameState({projectId : response.data?.projectId ?? "",projectName : response.data?.description ?? ""});

                setIsLoading(true)

            } catch (error : any ) {
                console.log(error)
            }
        }

        fetchProject();
    },[])

    React.useEffect(()=>{
        let isMounted = true;
        
        async function getprojects() {
            // 1. get the projects 
            // 2. set it to the use state hook 

            const token = await getToken();

            const response = await axios.get("http://localhost:8082/projects",{
                headers :{
                    "authorization" : `Bearer ${token}  `
                }
            });

            if (isMounted && response?.data) {
                const projects = response.data.map((data: any) => ({
                    projectId: data?.id ?? "",
                    projectName: data?.description ?? ""
                }));
                setProjectArr(projects);
            }
        }
        
        getprojects();
        
        return () => {
            isMounted = false;
        };
    },[])



    return (
        <div className="flex justify-start gap-1.5 w-full cursor-pointer">
            <UserButton/>
            <div className="text-2xl mx-2 text-gray-500">
                /
            </div>
        
            <DropdownMenu   >


                    {
                        (!isLoaging)?(
                                <div className=" flex items-center justify-center gap-2 text-gray-300 font-bold   font-roboto">
                                    <Spinner className="scale-125 "/>
                                    loading . . .
                                </div>
                            
                        ):(
                                <DropdownMenuTrigger asChild className="hover:bg-gray-400  w-full rounded-sm px-4 py-2 text-white bg-blue-400 max-w-64" >
                                    <div className=" flex justify-center items-center gap-7  ">
                                        <p className="truncate">{RenameState?.projectName}</p>
                                        <ChevronDown/>
                                    </div>
                                </DropdownMenuTrigger> 

                        )
                    }
                    {/* <Button className="w-56 flex gap-4" variant="outline">
                        <p className="truncate">{RenameState?.projectName}</p>
                        <ChevronDown/>
                    </Button> */}
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup> 
                                <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="flex">
                                            <FolderOpen/>
                                            <div>Open recent projects</div>
                                            <ChevronRight/>
                                        </DropdownMenuSubTrigger>

                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>

                                                    <Command>

                                                        <CommandInput placeholder="Type a command or search..." />


                                                        <CommandList>
                                                            <CommandEmpty>No Projects found . . .  </CommandEmpty>
                                                            <CommandGroup heading="Suggestions">
                                                                {
                                                                    projectArr.map((item,index)=>{

                                                                        return (
                                                                            <>
                                                                                <CommandItem key={index} onSelect={()=>{
                                                                                    projectRoute(item.projectId)
                                                                                }}>
                                                                                    
                                                                                    {item.projectName}
                                                                                    </CommandItem>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>

                                            </DropdownMenuSubContent>




                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                        <DropdownMenuItem>
                            <div className="w-full flex items-center justify-center gap-2 h-7">
                                <Download/>
                                <p>Export </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={(event)=>{
                                event.preventDefault();
                                changeOpenState(true);
                            }}
                        >
                            <div className="w-full flex items-center justify-center gap-2 h-7">
                                <SquarePen/>
                                <p>Rename ...</p>
                            </div>
                        </DropdownMenuItem>

 
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>


            <div className="CONTENTS_OF_ALERT_ITEMS"></div>
            <AlertDialog open={searchState} onOpenChange={ChangeSearchState}>
                <AlertDialogContent>
                    <p>hellow world     </p>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openState} onOpenChange={changeOpenState}>
                <AlertDialogContent>
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                        <CommandItem>Rohit</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                        </CommandGroup>


                        <CommandGroup heading="Projects">
                            {/* {
                                1. set a loading state to get the projects only when some one clicks to change the project 

                                2. set a proper ds to map the list of all the projects with their ids 


                                    
                            
                            } */}
                        </CommandGroup>
                    </CommandList>
                </Command>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}