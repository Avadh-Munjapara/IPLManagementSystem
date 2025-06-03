const { Router } = require("express");
const { addPlayer } = require("../controllers/player");


const playerRouter=Router();

playerRouter.post("/addPlayer",addPlayer);


export default playerRouter;