const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
//const curePatientMedicine = require('../../controller/staffCureController')


const curePatient = express.Router();

curePatient.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);

curePatient.post('/', PatientMedicineInfo.getPatientMedicalRecordInfo);

module.exports = curePatient;