import React from 'react'
import { useState } from 'react';
import bg from '../assets/stad.jpg';
import { BiSolidCricketBall } from "react-icons/bi";


const Login = () => {
   const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '',phone:'' });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '',phone:'' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Registering', form);
  };
  return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{backgroundImage: `url(${bg})` }}>
      <div className="bg-white/70 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
          {isLogin ? 'Login to IPL Manager' : 'Register for IPL Manager'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
              required
            />
             <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
              required
            />
            </>
            
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border bg-blue-50  border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border bg-blue-50 border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300"
          >
            <BiSolidCricketBall className="inline mr-2"  size={25}/>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>

  )
}

export default Login