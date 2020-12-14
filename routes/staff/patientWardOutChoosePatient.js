const express = require('express');

const patientWardOutChoosePatient = require('../../controller/staffInfoController')
const staffWard = require('../../controller/staffWardController');

const curePatient = express.Router();

curePatient.get('/', patientWardOutChoosePatient.getPatientInfoForWardOut);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
curePatient.post('/', staffWard.createPatientWardOut);

module.exports = curePatient;    
