const { Router } = require("express");
const { addPlayer } = require("../controllers/player");


const router=Router();

router.post("/addPlayer",addPlayer);

module.exports=router;