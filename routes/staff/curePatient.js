const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffCureController')


const curePatient = express.Router();

curePatient.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);

curePatient.post('/getPatientMedicalRecordInfo', PatientMedicineInfo.getPatientMedicalRecordInfo);
curePatient.post('/createPatientInvoice', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;