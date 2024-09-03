import React, { useState } from 'react';
import { Button } from './ui/button'
import axios from 'axios';
import {toast} from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
const Login = () => {

  const [input , setInput] = useState({
    
    email : "",
    password : "",
  })

  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) =>{
    setInput({...input , [e.target.name]:e.target.value});
  }


  const signupHandler = async (e)=>{
    e.preventDefault();
    console.log(input);
    try {
     setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true
      });
      if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
          navigate('/')
          toast.success(res.data.message);

          setInput({
            email: "",
            password: ""
        });
      }
    }catch(error){
      console.log(error);
      toast.success(error.response.data.message)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='flex items-center w-screen h-screen justify-center'>
        <form onSubmit={signupHandler} className='shadow-xl flex flex-col gap-5 p-8 border-2 border-gray-500 rounded-lg ' style={{
          boxShadow : '0 6px 6px rgba(0, 0, 0, 0.3)'
        }}>
              <div className='my-4'>
                  <h1 className='text-center font-bold text-xl'>LOGO</h1>
                  <p className='text-sm text-center text-gray-500'>Login to see photos and video from your friend</p>
              </div>
              <hr style={{
                border: 'none',
                height: 2,
                backgroundColor: '#ccc'
              }}></hr>
              {/* <div className='flex flex-col gap-1'>
                  <label>Username</label>
                  <input className='focus-visible: border border-gray-400 outline-none rounded-sm p-1.5 text-gray-700'
                     type="text" 
                     name='username'
                     placeholder='Enter Your Name'
                     value={input.username}
                     onChange={changeEventHandler}
                     
                  />
              </div> */}

              <div className='flex flex-col gap-1'>
                  <label>Email</label>
                  <input className='focus-visible: border border-gray-400 outline-none rounded-sm p-1.5 text-gray-700'
                     type="email" 
                     name='email'
                     placeholder='Enter Your Email'
                     value={input.email}
                     onChange={changeEventHandler}
                     
                  />
              </div>

              <div className='flex flex-col gap-1'>
                  <label>Password</label>
                  <input className='focus-visible: border border-gray-400 outline-none rounded-sm p-1.5 text-gray-700'
                     type="password" 
                     name='password'
                     placeholder='Enter Your Password'
                     value={input.password}
                     onChange={changeEventHandler}
                     
                  />
              </div>
                {
                  loading ? (
                    <Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        Please wait
                    </Button>
                  ) : (
                    <Button className = ' bg-[#2b6496]' type = 'submit'>Login</Button>
                  ) 
                }
             
              <span className='text-center'>Doesn't have an account ? <Link to="/signup" className='text-blue-700'>signup</Link>  </span>

        </form>
    </div>
  )
}

export default Login