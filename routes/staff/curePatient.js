const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
//const curePatientMedicine = require('../../controller/staffCureController')


const curePatientMedicine1 = express.Router();

curePatientMedicine1.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);

curePatientMedicine1.post('/', PatientMedicineInfo.getPatientIcdRecordInfo);
curePatientMedicine1.post('/', PatientMedicineInfo.getPatientMedicineRecordInfo);
curePatientMedicine1.post('/', PatientMedicineInfo.getPatientTreatmentRecordInfo);

module.exports = curePatientMedicine1;