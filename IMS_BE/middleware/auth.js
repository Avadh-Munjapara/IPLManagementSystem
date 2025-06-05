// middleware/authMiddleware.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];   
  if (!token) {
    return res.json({ success: false, message: 'Unauthorized: No token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    
    req.user = decoded;     
    next();
  } catch (err) {
    return res.json({ success: false, message: 'Invalid or expired token' });
  }
};

export default auth;
