import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Toaster from 'react-hot-toast'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const  myRouter = createBrowserRouter([
   {path:'/',element:<Register/>}
  ])
  return (
    <div>
      <RouterProvider router={myRouter}/>
      <Toaster/>
    </div>
  )
}

export default App