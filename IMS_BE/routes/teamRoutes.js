import express from "express";
import multer from "multer";
import {
  createTeam,
  editTeamForTo,
  editTeamForAdmin,
  removeTeam,
  getAllTeams,
  getTeam,
  getTeamsByOwner,
} from "../controllers/teamController.js";
import upload from "../middleware/multer.js";


const teamRouter = express.Router();

teamRouter.get("/all", getAllTeams);

teamRouter.post("/create",upload.single('logo'),createTeam);

teamRouter.put("/editForTo", editTeamForTo);

teamRouter.put("/editForAdmin", editTeamForAdmin);

teamRouter.delete("/remove", removeTeam);

teamrouter.get("/ownerTeam/:ownerId", getTeamsByOwner);

teamRouter.get("/:id", getTeam);

export default teamRouter;
