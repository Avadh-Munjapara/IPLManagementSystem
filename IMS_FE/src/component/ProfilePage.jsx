import React, { useEffect, useState } from 'react';
import defaultPic from '../assets/tropy.jpg';
import Spinner from './Spinner';
import axios from 'axios';
import ApiServices from '../services/ApiServices';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [loader, setLoader] = useState(false);
  const [form,setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profile_pic:''
  })
  const id = localStorage.getItem('id')

  const fetchUser = async () => {
    try {
      setLoader(true);
      const response = await ApiServices.getUserById(id);
      const data = response.data
      setForm(data.user)
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoader(false);
    }
  }

  useEffect(() => {
   fetchUser()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await ApiServices.updateUser(form);
      const data = response.data;
      if(data.success){
        toast.success(data.message);
        setForm(data.user);
      }
    } catch (err) {
      console.error('Update error:', err);
    }finally{
      setLoader(false);
    }
  };
console.log(form);

  return (
    <div className=" w-[100%] flex items-center justify-center">
      {loader ? (
        <Spinner />
      ) : (
        <div className="w-[100%]">
          <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8  rounded-xl shadow-lg w-full max-w-md">
              <img src={form.profile_pic}  className=' ml-32 w-30 h-30'/>
              <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Your Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />  
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
