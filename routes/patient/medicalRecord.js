const express = require('express');

const PatientMedicineInfo = require('../../controller/patientInfoController')

const checkMedicalRecord = express.Router();

checkMedicalRecord.get('/', PatientMedicineInfo.getPatientMedicalRecordInfo);

module.exports = checkMedicalRecord;