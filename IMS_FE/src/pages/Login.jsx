import React from "react";
import { useState } from "react";
import bg from "../assets/stad.jpg";
import { BiSolidCricketBall } from "react-icons/bi";
import apiClient from "../services/ApiServices";
import ApiServices from "../services/ApiServices";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await ApiServices.login(form);
    console.log(response);
    const data = response.data;
    
    if (!data.success) {
      toast.error(data.message);
    } else {
      localStorage.setItem('id',data.id)
      localStorage.setItem('token',data.token)
      toast.success(data.message);
      navigate('/dashboard');
    }
  } catch (error) {
    console.log(error);
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
  }
};

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/70 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
          Login to IPL Manager
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            autoComplete="email"
            onChange={handleChange}
            className="w-full p-3 border bg-blue-50  border-gray-300 rounded-lg"
            // required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
            // required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300"
          >
            <BiSolidCricketBall className="inline mr-2 cursor-pointer" size={25} />
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link
            to={"/"}
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
