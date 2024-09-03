import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import {  AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommentDialog from './CommentDialog';

import { MessageCircle, MoreHorizontal ,Send , Bookmark} from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart , FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Post = (post) => {
  const [text , setText] = useState("");
  const [open , setOpne] = useState(false);


  const changeEventHandler = (e) =>{
    const inputText = e.target.value;
    if(inputText.trim()){
       setText(inputText);
    }
    else{
      setText("");
    }
  }
  return (
    <div className='my-8 w-full max-w-sm max-auto'>
      <div className='flex items-center justify-between'>
       <div className='flex items-center gap-2'>
          <Avatar >
              <AvatarImage src={post.author?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>                 
          </Avatar>
          <h1>{post?.username}</h1>
       </div>
          <Dialog >
            <DialogTrigger>
              <MoreHorizontal className='cursor-pointer'/>
            </DialogTrigger>
            <DialogContent className = 'flex flex-col items-center text-sm'>
                <Button variant = 'ghost' className = 'cursor-pointer w-fit text-[#ED4956] font-bold'>Unfollow</Button>
                <Button variant = 'ghost' className = 'cursor-pointer w-fit font-bold'>Add to favorites</Button>
                <Button variant = 'ghost' className = 'cursor-pointer w-fit text-[#ED4956] font-bold'>Delete</Button>
                 
            </DialogContent>
          </Dialog>
      </div>

           <img
                className='rounded-sm my-2 w-full aspect-square object-cover'
                src={post.image}
                alt="post_img"
            />    

         <div className=' flex items-center  justify-between'>
            <div className='flex items-center gap-3'>
              {/* <FaHeart /> */}
                <FaRegHeart className='cursor-pointer hover:text-gray-600 ' size={'25px'}/>
                <MessageCircle onClick={()=>setOpne(true)} className='cursor-pointer hover:text-gray-600 '  size={'25px'}/>
                <Send className='cursor-pointer hover:text-gray-600 '  size={'25px'}/>
            </div>

            <div>
              <Bookmark className='cursor-pointer hover:text-gray-600 '  size={'25px'}/>
            </div>
         </div>
         
         <span className='font-medium block mb-2'>1k likes</span>

         <div>
         <p>
            <span className='font-medium mr-2'>username</span>
            {post.caption}
            </p>
            <span className='cursor-pointer text-sm text-gray-600' onClick={()=>setOpne(true)}>View all 10 comments</span>
            
            <CommentDialog open ={open} setOpne/>

            <div className='flex items-center'>
              <input type="text" 
                placeholder='Add comment...'
                value={text}
                onChange={changeEventHandler}
                className='outline-none text-sm w-full  p-1.5 cursor-pointer '
              />
              {
                text &&  <span className='text-[#3bADF8]'>Post</span>
              }
             
            </div>
         </div>
         
    </div>
  )
}

export default Post