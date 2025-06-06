import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const registerUser = async (req, res) => {
  try {
  const { name,email,password,phone } = req.body;
  console.log(req.body);
  
  if (!name || !email || !password || !phone) {
    return res.json({ 
        message: 'Please Fill All The Fields' ,
        success: false
    });
  }
  
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
      return res.json({ 
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
    return res.json({ 
        message: 'User registered successfully',
        success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({ 
        message: 'Internal server error' ,
        success: false
    });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ 
        message: 'Please Fill All The Fields' ,
        success: false
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ 
        message: 'Invalid email or password' ,
        success: false
    });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ 
        message: 'Invalid email or password' ,
        success: false
    });
    }
    const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
    const token =  jwt.sign(payload,process.env.JWT_SECRET_KEY,{
      expiresIn:'30d'
    })
    console.log(token);
    res.json({ 
        message: 'Login successful',
        success: true,
        name: user.name,
        image: user.profile_pic,
        token,
        id:user._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ 
        message: error.message ,
        success: false
    });
  }
}