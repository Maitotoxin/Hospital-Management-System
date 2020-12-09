const express = require('express');
const patientInvoice = require('../../controller/patientInvoiceAndReceiptController');

const invoice = express.Router();

invoice.get('/', patientInvoice.getUnpaidInvoiceInfo);

module.exports = invoice;