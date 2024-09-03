import React, { useRef, useState } from 'react'
import { Dialog , DialogContent } from '@radix-ui/react-dialog'
import { DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Await } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';

const CreatePost = ({open , setOpen})=> {
  const imageRef = useRef();
  const [file , setFile] = useState("");
  const [caption , setCaption] = useState("");
  const [imagePreview , setImagePreview] = useState("");
  const [loading , setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);
  const {posts} = useSelector(store=>store.post) 
  const dispatch = useDispatch();

  const fileChangeHandler = async(e)=>{
      const file = e.target.files?.[0];
      if(file){
        setFile(file);
        const dataUrl= await readFileAsDataURL(file);
        setImagePreview(dataUrl);
      }
  }
  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  return (
      <Dialog open={open}>
            <DialogContent onInteractOutside={()=>setOpen(false)} classname="fixed top-1/2 left-1/2  bg-blue-500 text-white flex items-center justify-center">

              

                  <div className="fixed top-24 left-1/2   font-semibold  rounded-md border  w-96 h-3/4 bg-slate-50  ">
                  <div className='text-center font-semibold flex flex-col pt-2  text-blue-600 bg-white'>Create New Post
                    <hr />
                  </div>
                  
                   <div className='flex gap-8 '>
                   <Avatar className='mt-4  overflow-auto bg-gray-800 rounded-[50%] '>
                      <AvatarImage src = {user?.prfilePicture} alt="img" />
                      <AvatarFallback className='ml-4 '>{user?.prfilePicture}</AvatarFallback>
                    </Avatar>

                        <div className='flex flex-col '>
                            <div>
                              <h1 className='font-semibold text-xl'>{user?.username}</h1>
                            </div>
                            <div>
                              <span className='text-gray-600 text-xs'>Bio her...</span>
                            </div>
                        </div>
                   </div>

                  <div className=' flex flex-col gap-5   items-center'>
                  <Textarea value = {caption} onChange={(e)=>setCaption(e.target.value)} className='focus-visible:ring-transparent border-none pb-8' placeholder = "write caption"/>
                  {
                    imagePreview &&(
                      <div className='w-full h-64 flex items-center justify-center'>
                        <img src={imagePreview} alt="previw-img" className='w-72 rounded-md'/>
                      </div>
                    )
                  }
                   <input ref={imageRef} type="file" className='hidden ' onChange={fileChangeHandler} />
                  
                     <Button onClick={()=>imageRef.current.click()} className='w-fit max-auto bg-[#0095F6] hover:bg-[#258bcf]'>Select from computer</Button>
                     
                  </div>
                  {/* <div className=' p-2 flex flex-col justify-end'><Button>Post</Button></div> */}
                    {
                      imagePreview &&(
                        loading ? (
                          <Button>
                            <Loader2 className='mr-2 w-full animate-spin'/>
                            Please wait
                          </Button>
                        ) :(
                          <Button onClick={createPostHandler} type = "submit" className="w-full mt-2">Post</Button>
                        )
                      )
                    }
                </div>
               

            </DialogContent>
      </Dialog>
  )
}

export default CreatePost