const express = require('express');
const multer = require('multer');
const printerController = require('../../controllers/printer.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Menyimpan file sementara

// Printer Management
router.get('/printers', printerController.getPrinters);
router.get('/printer/:printerName', printerController.getPrinterAttributes);
router.delete('/printer/:printerName', printerController.deletePrinter);
router.post('/printer', printerController.addPrinter);

// Print Job Management
router.post('/print', upload.single('file'), printerController.printFile);
router.get('/jobs', printerController.getPrintJobs);
router.get('/job/:jobId', printerController.getJobAttributes);
router.delete('/job/:jobId', printerController.cancelJob);

// Printer Control
router.put('/printer/:printerName/pause', printerController.pausePrinter);
router.put('/printer/:printerName/resume', printerController.resumePrinter);

module.exports = router;
