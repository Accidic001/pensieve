"use client"


import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useSession } from "next-auth/react"
import * as actions from "@/actions"

export default function HeaderAUth(){
    const Session = useSession();
    let authContent:React.ReactNode;
      if(Session.status ==="loading"){
           authContent =null;
      }
      else if(Session.data?.user){
        authContent = 
        <Popover >
          <PopoverTrigger>
        <Avatar>
        <AvatarImage src={Session.data.user.image || ""} />
        <AvatarFallback>Av</AvatarFallback>
      </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="p4">
          <form action={actions.signOut}>
          <Button color="primary" variant="secondary">
          Sign Out</Button>
          </form>
          </div>
      </PopoverContent>
      </Popover>
      }
        else{
         
          authContent = 
          <div className="flex items-center space-x-2">
          <form action={actions.signIn}><Button  color="secondary" variant="outline">
          Sign In</Button>
          </form>
          <form action={actions.signIn}>
          <Button color="primary" variant="secondary">
          Sign Up</Button>
          </form>
          </div>
        }

    return authContent;
}