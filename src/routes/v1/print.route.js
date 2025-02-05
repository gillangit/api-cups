const express = require('express');
const printerController = require('../../controllers/printer.controller');

const router = express.Router();

router.get('/names', printerController.getPrinter);

module.exports = router;
