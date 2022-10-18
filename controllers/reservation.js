const reservationService = require("../services/reservation");
const { BaseError } = require("../middlewares/app-error");
const util = require("../middlewares/util");

const getReservation = async (req, res) => {
  const data = req.query;
  const result = await reservationService.getReservation(data);
  if (!result[0]) {
    return res.status(204).json(result);
  }
  return res.status(200).json(result);
};

const createReservation = async (req, res) => {
  const hasKey = {
    date: false,
    patient: false,
    hospital_id: false,
    time_id: false,
    type_id: false,
  };
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  });
  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      throw new BaseError(`MISSING_VALUE`, 400);
    }
  }

  const { date, patient, hospital_id, time_id, type_id } = req.body;
  // 노쇼 기록 확인
  await util.hasNoShow(patient, hospital_id);
  // body 값 중 reference 없는거 있는지 확인/날짜 유효성 확인
  await util.dateFormatCheck(date);
  await util.isHospitalExist(hospital_id);
  await util.isTimeExist(time_id);
  await util.isTypeExist(type_id);
  await reservationService.createReservation(
    date,
    patient,
    hospital_id,
    time_id,
    type_id
  );
  return res.status(201).json({ message: "SUCCESS" });
};

const createNoShow = async (req, res) => {
  const reservationNumber = req.params.No;
  await util.isReservationExist(reservationNumber);
  const result = await reservationService.createNoShow(reservationNumber);
  return res.status(201).json({ message: "SUCCESS" });
};

const updateReservation = async (req, res) => {
  const reservationNumber = req.params.No;
  const data = req.body;
  if (reservationNumber) {
    await util.isReservationExist(reservationNumber);
  }
  if (data.time_id) {
    await util.isTimeExist(data.time_id);
  }
  if (data.type_id) {
    await util.isTypeExist(data.type_id);
  }
  if (data.date) {
    await util.dateFormatCheck(data.date);
  }
  await reservationService.updateReservation(reservationNumber, data);
  return res.status(201).json({ message: "SUCCESS" });
};

module.exports = {
  getReservation,
  createReservation,
  createNoShow,
  updateReservation,
};
