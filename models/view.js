// 예약가능 목록
const { myDataSource } = require("./typeorm-client");

const getAvailableReservations = async (hospitalId, date) => {
  let times = await myDataSource.query(
    `SELECT id, date_format(time, '%H:%i') AS time FROM times`
  );
  const taken = await myDataSource.query(
    `SELECT time_id FROM reservations WHERE (hospital_id = ? AND date = ?)`,
    [hospitalId, date]
  );
  const takenArr = await taken.map(function (element) {
    return element.time_id;
  });

  for (let i = 0; i < times.length; i++) {
    const isTaken = takenArr.includes(times[i].id);
    switch (isTaken) {
      case true:
        times[i].availiable = false;
        break;
      case false:
        times[i].availiable = true;
        break;
    }
  }
  console.log(times);
  return times;
};

module.exports = {
  getAvailableReservations,
};
