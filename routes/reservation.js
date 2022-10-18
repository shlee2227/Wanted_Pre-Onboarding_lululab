const express = require("express");
const reservationController = require("../controllers/reservation");
const errorHandler = require("../middlewares/error-handler");

const router = express.Router();

router.get("/", errorHandler(reservationController.getReservation));
router.post("/create", errorHandler(reservationController.createReservation));
router.post("/noshow/:No", errorHandler(reservationController.createNoShow));
router.patch(
  "/update/:No",
  errorHandler(reservationController.updateReservation)
);

module.exports = router;
