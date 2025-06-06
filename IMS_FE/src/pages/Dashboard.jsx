import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import profile from '../assets/tropy.jpg';
import { IoPeople } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import toast from 'react-hot-toast';
import Spinner from '../component/Spinner';
import ApiServices from '../services/ApiServices';

const Dashboard = () => {

  const [loader, setloader] = useState(true)
  const [userData, setuserData] = useState({})

  const [user, setuser] = useState(false)
  const [admin, setadmin] = useState(false)
  const [player, setplayer] = useState(false)
  const [teamOwner, setteamOwner] = useState(false)
  const id = localStorage.getItem('id')

  const fetchUser = async () => {
    try {
      setloader(true)
      const response = await ApiServices.getUserById(id);      
      const user = response.data.user
      const role = user.role
      
      setuserData(user)
      if (role == "ADMIN") { setadmin(true) }
      else if (role == "PLAYER") { setplayer(true) }
      else if (role == "TEAMOWNER") { setteamOwner(true) }
      else { setuser(true) }
    } catch (error) {
      console.log(error.message);
    }finally{
      setloader(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear()
    toast.success("Logout Successfull")
    navigate('/login')
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/5 h-full bg-gray-800 flex flex-col overflow-y-auto">
        <div className="text-white h-[18%] text-lg text-center p-5 border-b-4 border-white flex items-center">
          <img src={userData.profile_pic} alt="profile" className="h-20 w-20 rounded-full" />
          <p className="ml-5 font-bold text-2xl">{userData.name}</p>
          <p className="ml-2 font-bold text-sm">( {userData.role} )</p>
        </div>
        <div className="flex flex-col gap-5 mt-6">
          {
            user && (
              <>
                <Link to='/dashboard'  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <CgProfile size={22} className="mr-2" /> Profile
                </Link>
                <Link to='/dashboard/allteams' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoEye size={22} className="mr-2" />View Teams
                </Link>
                <Link to='/dashboard/allplayers' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoPeople size={22} className="mr-2" />View Players
                </Link>
                <button onClick={logout} className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left">
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )
          }
          {
            player && (
              <>
                <Link to='/dashboard' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <CgProfile size={22} className="mr-2" /> Profile
                </Link>
                <Link to='/dashboard/playerdetails' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoEye size={22} className="mr-2" />View Stats
                </Link>
                <Link to='/dashboard/allteams' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoEye size={22} className="mr-2" />View Teams
                </Link>
                <Link to='/dashboard/allplayers' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoPeople size={22} className="mr-2" />View Players
                </Link>
                <button onClick={logout} className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left">
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )
          }
          {
            admin && (
              <>
                <Link to='/dashboard' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <CgProfile size={25} className="mr-2" /> Profile
                </Link>
                <Link to='/dashboard/manageteams' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoEye size={25} className="mr-2" />Manage Team
                </Link>
                <Link to='/dashboard/manageplayer' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <MdOutlineManageAccounts size={25} className="mr-2" />Manage Player
                </Link>
                <button onClick={logout} className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left">
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )
          }
          {
            teamOwner && (
              <>
                <Link to='/dashboard' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <CgProfile size={25} className="mr-2" /> Profile
                </Link>
                <Link to='/dashboard/manageteams' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <IoEye size={25} className="mr-2" />Manage Team
                </Link>
                <Link to='/dashboard/manageplayer' className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition">
                  <MdOutlineManageAccounts size={25} className="mr-2" />Manage Player
                </Link>
                <button onClick={logout} className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left">
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )
          }

        </div>
      </div>
      <div className="w-4/5 bg-gray-100 h-screen overflow-y-auto overflow-x-hidden p-5">
        {
          loader ? (
            <Spinner />
          ) : (
            <Outlet />
          )
        }
      </div>

    </div>
  );
};

export default Dashboard;
