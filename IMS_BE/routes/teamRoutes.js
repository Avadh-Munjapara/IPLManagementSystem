import express from "express";
import {
  createTeam,
  editTeamForTo,
  editTeamForAdmin,
  removeTeam,
  getAllTeams,
  getTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/create", createTeam);

router.put("/editForTo", editTeamForTo);

router.put("/editForAdmin", editTeamForAdmin);

router.delete("/remove", removeTeam);

router.get("/all", getAllTeams);

router.get("/:id", getTeam);

export default router;