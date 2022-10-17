const express = require("express");
const viewController = require("../controllers/view");
const errorHandler = require("../middlewares/error-handler");

const router = express.Router();

router.get("/", errorHandler(viewController.getAvailableReservations));

module.exports = router;
