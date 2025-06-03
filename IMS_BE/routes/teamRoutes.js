const { Router } = require("express");
const { createTeam } = require("../controllers/teamController");

const router=Router();

router.post("/createTeam",createTeam);

module.exports=router;