const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')

const checkMedicalRecord = express.Router();

checkMedicalRecord.get('/', PatientMedicineInfo.getPatientMedicalRecordInfo);

module.exports = checkMedicalRecord;