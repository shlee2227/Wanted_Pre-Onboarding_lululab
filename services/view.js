const viewDao = require("../models/view");

const getAvailableReservations = async (hospitalId, date) => {
  const result = await viewDao.getAvailableReservations(hospitalId, date);
  return result;
};

module.exports = {
  getAvailableReservations,
};
