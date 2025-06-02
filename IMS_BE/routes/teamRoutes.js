const { Router } = require("express");
const { createTeam } = require("../controllers/team");

const router=Router();

router.post("/createTeam",createTeam);

module.exports=router;