const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffCureController')

const curePatientMedicine1 = express.Router();
curePatientMedicine1.get('/', PatientMedicineInfo.getTreatmentInfoAndPatientTreatmentRecordInfo);

curePatientMedicine1.post('/', curePatientMedicine.createCurePatientTreatment);

module.exports = curePatientMedicine1;