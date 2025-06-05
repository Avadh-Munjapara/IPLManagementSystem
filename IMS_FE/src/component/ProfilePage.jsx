import React, { useEffect, useState } from 'react';
import defaultPic from '../assets/tropy.jpg';
import Spinner from './Spinner';
import axios from 'axios';
import ApiServices from '../services/ApiServices';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const [loader, setLoader] = useState(false);
  const location = useLocation()
  const [form,setForm] = useState()
  const userData = location.state || {}
  console.log(userData);
  

  useEffect(() => {
    if (userData) {
      setForm({
        // name: userData.name,
        // email: userData.email,
        // phone: userData.phone,
        // profile_pic: userData.profile_pic,
      });
      setLoader(false);
    } else {
      // fallback: fetch from API
      // fetchUser();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.put('/api/user/profile', form); // Update endpoint
      console.log('Updated:', res.data);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className=" w-[100%] flex items-center justify-center">
      {loader ? (
        <Spinner />
      ) : (
        <div className="w-[100%]">
          <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Your Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded-lg bg-gray-50"
                />
                <input
                  type="text"
                  name="profile_pic"
                  value={userData.profile_pic}
                  onChange={handleChange}
                  placeholder="Profile Picture URL"
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
