const Cups = require("node-cups");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const cups = new Cups();

// 1. Get List of Printers
const getPrinters = catchAsync(async (req, res) => {
  const printers = await cups.getPrinters();
  if (!printers) {
    throw new ApiError(httpStatus.NOT_FOUND, "No printers found");
  }
  res.status(httpStatus.OK).send(printers);
});

// 2. Get Printer Attributes
const getPrinterAttributes = catchAsync(async (req, res) => {
  const { printerName } = req.params;
  const attributes = await cups.getPrinterAttributes(printerName);
  if (!attributes) {
    throw new ApiError(httpStatus.NOT_FOUND, "Printer not found");
  }
  res.status(httpStatus.OK).send(attributes);
});

// 3. Print File
const printFile = catchAsync(async (req, res) => {
  const { printerName } = req.body;
  const filePath = req.file?.path;

  if (!filePath) {
    throw new ApiError(httpStatus.BAD_REQUEST, "File is required");
  }

  await cups.printFile(printerName, filePath);
  res.status(httpStatus.OK).send({ message: `Printing file ${filePath} on ${printerName}` });
});

// 4. Get List of Print Jobs
const getPrintJobs = catchAsync(async (req, res) => {
  const jobs = await cups.getJobs();
  res.status(httpStatus.OK).send(jobs);
});

// 5. Get Details of a Specific Print Job
const getJobAttributes = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const jobAttributes = await cups.getJobAttributes(jobId);
  if (!jobAttributes) {
    throw new ApiError(httpStatus.NOT_FOUND, "Print job not found");
  }
  res.status(httpStatus.OK).send(jobAttributes);
});

// 6. Cancel a Print Job
const cancelJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  await cups.cancelJob(jobId);
  res.status(httpStatus.OK).send({ message: `Job ${jobId} has been canceled` });
});

// 7. Pause a Printer
const pausePrinter = catchAsync(async (req, res) => {
  const { printerName } = req.params;
  await cups.disablePrinter(printerName);
  res.status(httpStatus.OK).send({ message: `Printer ${printerName} has been paused` });
});

// 8. Resume a Printer
const resumePrinter = catchAsync(async (req, res) => {
  const { printerName } = req.params;
  await cups.enablePrinter(printerName);
  res.status(httpStatus.OK).send({ message: `Printer ${printerName} has been resumed` });
});

// 9. Delete a Printer
const deletePrinter = catchAsync(async (req, res) => {
  const { printerName } = req.params;
  await cups.deletePrinter(printerName);
  res.status(httpStatus.OK).send({ message: `Printer ${printerName} has been deleted` });
});

// 10. Add a New Printer
const addPrinter = catchAsync(async (req, res) => {
  const { printerName, deviceUri, ppdFile } = req.body;
  if (!printerName || !deviceUri || !ppdFile) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Missing required fields");
  }

  await cups.addPrinter(printerName, deviceUri, ppdFile);
  res.status(httpStatus.CREATED).send({ message: `Printer ${printerName} has been added` });
});

module.exports = {
  getPrinters,
  getPrinterAttributes,
  printFile,
  getPrintJobs,
  getJobAttributes,
  cancelJob,
  pausePrinter,
  resumePrinter,
  deletePrinter,
  addPrinter,
};
