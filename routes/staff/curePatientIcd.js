const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffCureController')

const curePatientMedicine1 = express.Router();
curePatientMedicine1.get('/', PatientMedicineInfo.getPatientIcdRecordInfo);
curePatientMedicine1.get('/', PatientMedicineInfo.getIcdInfoCure);

curePatientMedicine1.post('/', curePatientMedicine.createCurePatientIcd);

module.exports = curePatientMedicine1;