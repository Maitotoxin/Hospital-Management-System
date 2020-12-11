const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffCureController')

const curePatientMedicine1 = express.Router();
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientIcdInfo);
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientMedicineInfo);
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientTreatmentInfo);
curePatientMedicine1.post('/', curePatientMedicine.createCurePatientIcd);

module.exports = curePatientMedicine1;