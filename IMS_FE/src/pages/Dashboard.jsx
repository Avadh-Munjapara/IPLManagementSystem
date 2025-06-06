import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import profile from "../assets/tropy.jpg";
import { IoPeople } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";
import Spinner from "../component/Spinner";
import ApiServices from "../services/ApiServices";
import  LoadingContext  from "../contexts/LoadingContext";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [loader, setloader] = useState(true);
  const [userData, setuserData] = useState();

  const [user, setuser] = useState(false);
  const [admin, setadmin] = useState(false);
  const [player, setplayer] = useState(false);
  const [teamOwner, setteamOwner] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await ApiServices.getUser();
      const data = response.data;
      const role = data.user.role;
      setuserData(data.user);
      if (role == "ADMIN") {
        setadmin(true);
      } else if (role == "PLAYER") {
        setplayer(true);
      } else if (role == "TEAMOWNER") {
        setteamOwner(true);
      } else {
        setuser(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
    setloader(false);
  }, []);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    toast.success("Logout Successfull");
    navigate("/login");
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <div className="w-full h-screen flex overflow-hidden">
        <div className="w-1/5 h-full bg-gray-800 flex flex-col overflow-y-auto">
          <div className="text-white h-[18%] text-lg text-center p-5 border-b-4 border-white flex items-center">
            <img
              src={profile}
              alt="profile"
              className="h-24 w-24 rounded-full"
            />
            <p className="ml-5 font-bold text-lg"></p>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            {user && (
              <>
                <Link
                  to="/dashboard/profile"
                  state={userData}
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <CgProfile size={22} className="mr-2" /> Profile
                </Link>
                <Link
                  to="/dashboard/teams"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoEye size={22} className="mr-2" />
                  View Teams
                </Link>
                <Link
                  to="/dashboard/players"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoPeople size={22} className="mr-2" />
                  View Players
                </Link>
                <button
                  onClick={logout}
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left"
                >
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )}
            {player && (
              <>
                <Link
                  to="/dashboard/profile"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <CgProfile size={22} className="mr-2" /> Profile
                </Link>
                <Link
                  to="/dashboard/teams"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoEye size={22} className="mr-2" />
                  View Stats
                </Link>
                <Link
                  to="/dashboard/teams"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoEye size={22} className="mr-2" />
                  View Teams
                </Link>
                <Link
                  to="/dashboard/players"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoPeople size={22} className="mr-2" />
                  View Players
                </Link>
                <button
                  onClick={logout}
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left"
                >
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )}
            {teamOwner && (
              <>
                <Link
                  to="/dashboard/manageTeamTo"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoPeople size={22} className="mr-2" /> Manage Team
                </Link>
              </>
            )}
            {admin && (
              <>
                <Link
                  to="/dashboard/profile"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <CgProfile size={25} className="mr-2" /> Profile
                </Link>
                <Link
                  to="/dashboard/manageteams"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <IoEye size={25} className="mr-2" />
                  Manage Team
                </Link>
                <Link
                  to="/dashboard/players"
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition"
                >
                  <MdOutlineManageAccounts size={25} className="mr-2" />
                  Manage Player
                </Link>
                <button
                  onClick={logout}
                  className="text-white px-5 py-3 text-lg flex items-center hover:bg-blue-500 transition text-left"
                >
                  <MdLogout size={25} className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
        {loader ? (
          <div className="w-4/5 bg-gray-200 p-5 overflow-y-auto">
            <Spinner />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default Dashboard;
