const reservationDao = require("../models/reservation");
const { BaseError } = require("../middlewares/app-error");

const getReservation = async (data) => {
  let result;
  if (data.bookNo && data.patient) {
    throw new BaseError("INVALID_REQUEST", 404);
  } else if (data.bookNo) {
    result = await reservationDao.getReservationByReservationNumber(
      data.bookNo
    );
  } else if (data.patient) {
    result = await reservationDao.getReservationByUserId(data.patient);
  } else {
    throw new BaseError("INVALID_REQUEST", 404);
  }
  return result;
};

const createReservation = async (date, patient, hospitalId, timeId, typeId) => {
  await reservationDao.createReservation(
    date,
    patient,
    hospitalId,
    timeId,
    typeId
  );
  return;
};

const createNoShow = async (reservationNumber) => {
  await reservationDao.createNoShow(reservationNumber);
  return;
};

const updateReservation = async (reservationNumber, data) => {
  await reservationDao.updateReservation(reservationNumber, data);
  return;
};

module.exports = {
  createReservation,
  getReservation,
  createNoShow,
  updateReservation,
};
