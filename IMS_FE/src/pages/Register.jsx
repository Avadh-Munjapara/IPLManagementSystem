import React from 'react'
import { useState } from 'react';
import bg from '../assets/stad.jpg';
import { BiSolidCricketBall } from "react-icons/bi";
import ApiServices from '../services/ApiServices';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/AxiosClient';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '',phone:'' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await ApiServices.register(form); // expect 2xx

    const data = response.data;
    if (!data.success) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      navigate('/login');
    }
  } catch (error) {
    // 400s, 500s come here
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
    console.error("Registration error:", error.response?.data);
  }
};

    
  return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{backgroundImage: `url(${bg})` }}>
      <div className="bg-white/70 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
          Register for IPL Manager
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete='username'
              className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
              // required
            />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete='email'
            className="w-full p-3 border bg-blue-50  border-gray-300 rounded-lg"
            // required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete='password'
            className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
            // required
          />
           <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              autoComplete='phone'
              className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
              // required
            />
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300"
          >
            <BiSolidCricketBall className="inline mr-2"  size={25}/>
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link to={"/login"}
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Register