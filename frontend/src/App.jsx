// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
// // import {Button} from './components/ui/button';
import Signup from './components/Signup'
import Login from './components/Login';
import Home from './components/Home';
import MainLaout from './components/MainLaout';
import Profile from './components/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const browserRouter = createBrowserRouter([
  {
    path : '/',
    element:<MainLaout/>,
    children:[
      {
        path :'/',
        element :<Home/>
      },
      {
        path : '/profile',
        element:<Profile/>
      },
    ]
  },

 

  {
    path : '/login',
    element:<Login/>
  },

  {
    path : '/signup',
    element:<Signup/>
  },

])

function App() {

  return (
    <>
     <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
