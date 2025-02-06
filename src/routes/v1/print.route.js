const express = require('express');
const multer = require("multer");
const printerController = require('../../controllers/printer.controller');

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Menyimpan file sementara

// Printer Management
router.get("/printers", PrinterController.getPrinters);
router.get("/printer/:printerName", PrinterController.getPrinterAttributes);
router.delete("/printer/:printerName", PrinterController.deletePrinter);
router.post("/printer", PrinterController.addPrinter);

// Print Job Management
router.post("/print", upload.single("file"), PrinterController.printFile);
router.get("/jobs", PrinterController.getPrintJobs);
router.get("/job/:jobId", PrinterController.getJobAttributes);
router.delete("/job/:jobId", PrinterController.cancelJob);

// Printer Control
router.put("/printer/:printerName/pause", PrinterController.pausePrinter);
router.put("/printer/:printerName/resume", PrinterController.resumePrinter);

module.exports = router;
