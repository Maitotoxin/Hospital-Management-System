const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')

const curePatientMedicine1 = express.Router();

curePatientMedicine1.get('/', PatientMedicineInfo.getPatientMedicineRecordInfo);
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientTreatmentRecordInfo);
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientIcdRecordInfo);

module.exports = curePatientMedicine1;