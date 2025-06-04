import React from "react";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";  
const App = () => {

  const myRouter = createBrowserRouter(
    [
  {path: "/" ,element: <Login />},

  ]);
  return (
    <div>
   <RouterProvider router={myRouter}/>
    <Toaster/>
    </div>
  );
};

export default App;
