import { Router } from "express";
import { loginUser, registerUser } from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";
import { getUser, getUserById } from "../controllers/userController.js";

const userRouter=Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getUser",auth,getUser)
userRouter.get("/getUserById/:id",auth,getUserById);

export default userRouter;