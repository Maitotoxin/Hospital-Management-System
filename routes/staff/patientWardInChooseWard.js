const express = require('express');

const patientWardInChooseWard = require('../../controller/staffInfoController')


const curePatient = express.Router();

curePatient.get('/', patientWardInChooseWard.getWardInfoForWardIn);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;
