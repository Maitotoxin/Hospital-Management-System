const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController');
const curePatientMedicine = require('../../controller/staffCureController');
const curePatientInvocie = require('../../controller/staffPatientInvoiceController');

const curePatientMedicine1 = express.Router();
curePatientMedicine1.get('/', curePatientInvocie.createPatientInvoiceAndIcd);
curePatientMedicine1.post('/', curePatientMedicine.createCurePatientIcd);

module.exports = curePatientMedicine1;