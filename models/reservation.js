const { myDataSource } = require("./typeorm-client");
const { BaseError } = require("../middlewares/app-error");

const getReservationByReservationNumber = async (reservationNumber) => {
  const result = await myDataSource.query(
    `SELECT reservation_number,date,patient,hospital,hospital_contact,time,type,updated_at,created_at FROM reservation_data WHERE reservation_number = ?`,
    [reservationNumber]
  );
  return result;
};

const getReservationByUserId = async (patient) => {
  const result = await myDataSource.query(
    `SELECT reservation_number,date,patient,hospital,hospital_contact,time,type,updated_at,created_at FROM reservation_data WHERE patient = ?`,
    [patient]
  );
  return result;
};

const createReservation = async (date, patient, hospitalId, timeId, typeId) => {
  try {
    await myDataSource.query(
      `INSERT INTO reservations (reservation_number,date,patient,hospital_id,time_id,type_id) VALUES (uuid_short(),?,?,?,?,?)`,
      [date, patient, hospitalId, timeId, typeId]
    );
  } catch (err) {
    console.log(err);
    throw new BaseError("DUPLICATED_RESERVATION", 400);
  }
  return;
};

const createNoShow = async (reservationNumber) => {
  const data = (
    await myDataSource.query(
      `SELECT reservation_number,patient,hospital_id FROM reservations WHERE reservation_number = ?`,
      [reservationNumber]
    )
  )[0];
  try {
    await myDataSource.query(
      `INSERT INTO no_shows (reservation_number, patient, hospital_id) VALUES (?,?,?) `,
      [reservationNumber, data.patient, data.hospital_id]
    );
  } catch {
    throw new BaseError("DUPLICATED_DATA", 400);
  }
  return;
};

const updateReservation = async (reservationNumber, data) => {
  let dataArr = [];
  if (data.date) {
    dataArr.push(`date="${data.date}"`);
  }
  if (data.patient) {
    dataArr.push(`patient="${data.patient}"`);
  }
  if (data.time_id) {
    dataArr.push(`time_id=${data.time_id}`);
  }
  if (data.type_id) {
    dataArr.push(`type_id=${data.type_id}`);
  }
  const dataStr = dataArr.join(", ");
  const sql1 = "UPDATE reservations SET ";
  const sql2 = " WHERE reservation_number = ?";
  const sql = sql1.concat(dataStr, sql2);
  console.log(sql);
  try {
    await myDataSource.query(sql, [reservationNumber]);
  } catch {
    throw new BaseError("DUPLICATED_RESERVATION", 400);
  }

  return;
};

module.exports = {
  getReservationByReservationNumber,
  getReservationByUserId,
  createReservation,
  createNoShow,
  updateReservation,
};
