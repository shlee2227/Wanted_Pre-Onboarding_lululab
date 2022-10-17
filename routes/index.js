const express = require("express");
const router = express.Router();

const viewRouter = require("./view");

router.use("/users", usersRouter);
module.exports = router;
