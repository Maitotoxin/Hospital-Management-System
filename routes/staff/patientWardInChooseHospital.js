const express = require('express');

const patientWardInChooseHospital = require('../../controller/staffInfoController')


const curePatient = express.Router();

curePatient.get('/', patientWardInChooseHospital.getHospitalInfoForWardIn);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;
