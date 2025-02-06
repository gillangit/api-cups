const {
  getPrinterNames,
  getPrinterOptions,
  getAllPrinterOptions,
  getCompletedQueue,
  getNotCompletedQueue,
  printBuffer,
  printFile,
  cancelJob,
  cancelAllJobs,
} = require('node-cups');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const getPrinters = catchAsync(async (req, res) => {
  const printers = await getPrinterNames();
  if (!printers || printers.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tidak ada printer yang tersedia');
  }
  res.send(printers);
});

const getPrinterSettings = catchAsync(async (req, res) => {
  const { printerName } = req.params;
  const options = await getPrinterOptions(printerName);

  if (!options) {
    throw new ApiError(httpStatus.NOT_FOUND, `Printer ${printerName} tidak ditemukan`);
  }

  res.send(options);
});

const getAllPrintersSettings = catchAsync(async (req, res) => {
  const options = await getAllPrinterOptions();
  res.send(options);
});

const getCompletedJobs = catchAsync(async (req, res) => {
  const jobs = await getCompletedQueue();
  res.send(jobs);
});

const getPendingJobs = catchAsync(async (req, res) => {
  const jobs = await getNotCompletedQueue();
  res.send(jobs);
});

const printTextBuffer = catchAsync(async (req, res) => {
  const { printerName, text } = req.body;

  if (!printerName || !text) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Printer dan teks harus diisi');
  }

  const jobId = await printBuffer(printerName, Buffer.from(text));
  res.send({ message: 'Teks berhasil dikirim ke printer', jobId });
});

const printFileDocument = catchAsync(async (req, res) => {
  const { printerName, filePath } = req.body;

  if (!printerName || !filePath) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Printer dan path file harus diisi');
  }

  const jobId = await printFile(printerName, filePath);
  res.send({ message: 'File berhasil dikirim ke printer', jobId });
});

const cancelPrintJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job ID harus diberikan');
  }

  await cancelJob(jobId);
  res.send({ message: `Job ${jobId} berhasil dibatalkan` });
});

const cancelAllPrintJobs = catchAsync(async (req, res) => {
  await cancelAllJobs();
  res.send({ message: 'Semua job print telah dibatalkan' });
});

module.exports = {
  getPrinters,
  getPrinterSettings,
  getAllPrintersSettings,
  getCompletedJobs,
  getPendingJobs,
  printTextBuffer,
  printFileDocument,
  cancelPrintJob,
  cancelAllPrintJobs,
};
