const express = require('express');
const patientInvoice = require('../../controller/patientController');

const invoice = express.Router();

invoice.get('/', patientInvoice.getInvoiceInfo);

module.exports = invoice;