const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffInfoController')

const curePatientMedicine1 = express.Router();

curePatientMedicine1.get('/', PatientMedicineInfo.getPatientMedicineInfo);

curePatientMedicine1.post('/', curePatientMedicine.curePatientMedicine);

module.exports = curePatientMedicine1;