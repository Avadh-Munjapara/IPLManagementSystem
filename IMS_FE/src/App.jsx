import React from "react";
<<<<<<< HEAD
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
=======
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

const App = () => {
  const myRouter = createBrowserRouter([{ path: "/", element: <Register /> }]);
  return (
    <div>
      <RouterProvider router={myRouter} />
      <Toaster />
>>>>>>> 405bc48 (use live share)
    </div>
  );
};

export default App;
