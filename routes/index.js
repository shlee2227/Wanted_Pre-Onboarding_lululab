const express = require("express");
const router = express.Router();

const viewRouter = require("./view");
const reservationRouter = require("./reservation");

router.use("/view", viewRouter);
router.use("/book", reservationRouter);

module.exports = router;
