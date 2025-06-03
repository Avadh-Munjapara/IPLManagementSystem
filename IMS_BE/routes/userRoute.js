import { Router } from "express";
import { signUP, login } from "../controllers/authController.js";

const userrouter=Router();

userrouter.post("/signUp",signUP);
userrouter.post("/login",login);

export default userrouter;