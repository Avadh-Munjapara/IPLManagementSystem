const { Router } = require("express");
const { createTeam } = require("../controllers/team");

const teamRouter=Router();

teamRouter.post("/createTeam",createTeam);

export default teamRouter;