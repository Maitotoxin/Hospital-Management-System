const express = require('express');
const patientInvoice = require('../../controller/patientInfoController');

const invoice = express.Router();

invoice.get('/', patientInvoice.getInvoiceInfo);

module.exports = invoice;