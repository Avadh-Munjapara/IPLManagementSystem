import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel';
import { use } from 'react';

export const registerUser = async (req, res) => {
  const { name,email,password,phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ 
        message: 'Please Fill All The Fields' ,
        success: false
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already exists' ,
        success: false
    });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await newUser.save();
    res.status(201).json({ 
        message: 'User registered successfully',
        success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        message: 'Internal server error' ,
        success: false
    });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
        message: 'Please Fill All The Fields' ,
        success: false
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid email or password' ,
        success: false
    });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        message: 'Invalid email or password' ,
        success: false
    });
    }

    res.status(200).json({ 
        message: 'Login successful',
        success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        message: 'Internal server error' ,
        success: false
    });
  }
}