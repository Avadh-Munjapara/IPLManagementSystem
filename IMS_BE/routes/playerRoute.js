import { getPlayers } from "../controllers/playerController.js";
import express from 'express'


const playerRouter=express.Router();

playerRouter.get('/getAll',getPlayers);
// playerRouter.post("/addPlayer",addPlayer);

export default playerRouter;