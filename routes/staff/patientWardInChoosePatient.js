const express = require('express');

const patientWardInChoosePatient = require('../../controller/staffInfoController')


const curePatient = express.Router();

curePatient.get('/', patientWardInChoosePatient.getPatientInfoForWardIn);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;    
