import { addPlayer, getPlayerById, getPlayers, updatePlayer } from "../controllers/playerController.js";
import express from 'express'
import upload from "../middleware/multer.js";


const playerRouter=express.Router();

playerRouter.get('/getAll',getPlayers);
playerRouter.get('/:id',getPlayerById)
playerRouter.put('/update',upload.single("profile"),updatePlayer);
playerRouter.post('/create',upload.single("profile"),addPlayer);
// playerRouter.post("/addPlayer",addPlayer);

export default playerRouter;