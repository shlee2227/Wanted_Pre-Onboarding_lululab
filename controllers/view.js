const viewService = require("../services/view");
const util = require("../middlewares/util");

const getAvailableReservations = async (req, res) => {
  const hospitalId = req.params.hos_id;
  const { date } = req.query;
  await util.isHospitalExist(hospitalId);
  await util.dateFormatCheck(date);
  const result = await viewService.getAvailableReservations(hospitalId, date);
  return res.status(200).json(result);
};

module.exports = {
  getAvailableReservations,
};
