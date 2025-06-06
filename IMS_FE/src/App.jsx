import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./component/ProfilePage";
import ManageTeams from "./component/ManageTeams";
import ManagePlayer from "./component/ManagePlayer";
import AllTeams from "./pages/AllTeams";
import AllPlayers from "./pages/AllPlayers";
import PlayerDetails from "./pages/PlayerDetails";

const App = () => {
  const myRouter = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {path: "/dashboard", element: <Dashboard/> ,  
      children:[
        {path:'/dashboard/',element:<ProfilePage/>},
        {path:'/dashboard/manageteams',element:<ManageTeams/>,},
        {path:'/dashboard/manageplayer', element:<ManagePlayer/>},
        {path:'/dashboard/allteams',element:<AllTeams/>},
        {path:'/dashboard/allplayers',element:<AllPlayers/>},
        {path:'/dashboard/playerdetails',element:<PlayerDetails/>},
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
