const { Router } = require("express");
const { signUP } = require("../controllers/auth");

const router=Router();

router.post("/signUp",signUP);

module.exports=router;