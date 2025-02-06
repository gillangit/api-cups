const express = require('express');
const printerController = require('../../controllers/printer.controller');
const verifyApiKey = require('../../middlewares/verifyapi');

const router = express.Router();

router.get('/printers', verifyApiKey, printerController.getPrinters);
router.get('/printer/:printerName', verifyApiKey, printerController.getPrinterSettings);
router.get('/printers/options', verifyApiKey, printerController.getAllPrintersSettings);
router.get('/jobs/completed', verifyApiKey, printerController.getCompletedJobs);
router.get('/jobs/pending', verifyApiKey, printerController.getPendingJobs);
router.post('/print/text', verifyApiKey, printerController.printTextBuffer);
router.post('/print/file', verifyApiKey, printerController.printFileDocument);
router.delete('/print/cancel/:jobId', verifyApiKey, printerController.cancelPrintJob);
router.delete('/print/cancel-all', verifyApiKey, printerController.cancelAllPrintJobs);

module.exports = router;
