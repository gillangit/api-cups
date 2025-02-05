const httpStatus = require('http-status');
const { getPrinterNames } = require('node-cups');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getPrinter = catchAsync(async (req, res) => {
  const print = getPrinterNames();
  if (!print) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(print);
});

module.exports = {
  getPrinter,
};
