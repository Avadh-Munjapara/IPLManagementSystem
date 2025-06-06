import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./component/ProfilePage";
import ManageTeams from "./component/ManageTeams";
import ManagePlayer from "./component/ManagePlayer";

const App = () => {
  const myRouter = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {path: "/dashboard", element: <Dashboard/> ,  
      children:[
        {path:'/dashboard/manageteams',element:<ManageTeams/>,},
        {path:'/dashboard/profile',element:<ProfilePage/>},
        {path:'/dashboard/manageplayer', element:<ManagePlayer/>},
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={myRouter} />
      <Toaster />
    </div>
  );
};

export default App;
