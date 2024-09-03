import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreHorizontalIcon } from "lucide-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CommentDialog =({open , setOpen})=> {
  const [text , setText] = useState("");
  const changeEventHandler = (e) =>{
    const inputText = e.target.value;
    if(inputText.trim()){
      setText(inputText);
    }else{
      setText("");
    }
  }

  const sendMessageHandler = async(e)=>{
    alert(text)
  }
  return (
      <Dialog open={open}>
        {/* /////// fault not close the pop /// */}
        {/* <DialogContent onInteractOutside={()=>setOpen(false)}> */}
           <DialogContent onInteractOutside={()=> setOpen(false)} className="max-w-5xl p-0 flex flex-col">

            <div className="flex flex-1">
                    <div className="w-1/2">
                        <img src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post_image"  className="w-full h-full object-cover rounded-l-lg"/>
                    </div>

                      <div className="w-1/2 flex-col justify-between">
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                    <Link>
                                      <Avatar>
                                          <AvatarImage src=""/>
                                              <AvatarFallback className="bg-gray-400 rounded-[50%] overflow-hidden p-1.5">CN</AvatarFallback>
                                      </Avatar>
                                    </Link>
                                    <div className="flex flex-row items-center gap-2">
                                      <Link className="font-semibold text-xs">Username</Link>
                                      {/* <span className="text-gray-600 text-sm">Bio here ...</span> */}
                                    </div>
                              </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <MoreHorizontalIcon className="cursor-pointer hover:bg-gray-300 rounded-[50%]"/>
                                  </DialogTrigger>
                                      <DialogContent className = 'flex flex-col items-center text-sm text-center'>
                                          <div className="cursor-pointer w-full text-[#ED4956] font-bold flex flex-col gap-3 ">
                                                Unfollow
                                                <hr className="bg-slate-500" />
                                          </div>
                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Add to favorites
                                                <hr className="bg-slate-500" />
                                          </div>
                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Go to post
                                                <hr className="bg-slate-500" />
                                          </div>
                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Share to..
                                                <hr className="bg-slate-500" />
                                          </div>
                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Copylink
                                                <hr className="bg-slate-500" />
                                          </div>

                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Embed
                                                <hr className="bg-slate-500" />
                                          </div>

                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                About this account
                                                <hr className="bg-slate-500" />
                                          </div>

                                          <div className="cursor-pointer w-full  flex flex-col gap-3 ">
                                                Cancel
                                                <hr className="bg-slate-500" />
                                          </div>
                                          
                                         
                                      </DialogContent>
                                </Dialog>
                            </div>
                            <hr className="bg-slate-500 "/>
                            <div className="flex-1 overflow-y-auto max-h-96 p-4">
                                Lorem ipsum dolor sit
                            </div>
                            <div className="p-4 pt-60 ">
                                <div className="flex gap-2 items-center">
                                      <input onChange={changeEventHandler}
                                       type="text" 
                                       value={text}
                                        placeholder="Add a comment..."
                                        className="w-full outline-none border border-gray-300 p-1.5 rounded-lg text-gray-700"
                                      />

                                      <Button disabled = {!text.trim()} onClick = {sendMessageHandler} variant = "outline" className = 'text-blue-600 text-white bg-blue-600 hover:bg-blue-600'>Send</Button>
                                </div>
                            </div>
                      </div>
            </div>
           
          </DialogContent>
      </Dialog>
  )
}

export default CommentDialog