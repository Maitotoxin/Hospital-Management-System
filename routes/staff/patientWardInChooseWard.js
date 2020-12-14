const express = require('express');

const patientWardInChooseWard = require('../../controller/staffInfoController');
const staffWard = require('../../controller/staffWardController');

const curePatient = express.Router();

curePatient.get('/', patientWardInChooseWard.getWardInfoForWardIn);
curePatient.post('/', staffWard.createPatientWardIn);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;
