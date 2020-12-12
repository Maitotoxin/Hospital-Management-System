const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffCureController')

const curePatientMedicine1 = express.Router();
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientNewMedicalRecordInfo);
//curePatientMedicine1.post('/', curePatientMedicine.deleteCurePatientIcd);

module.exports = curePatientMedicine1;