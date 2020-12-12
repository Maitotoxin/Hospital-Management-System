const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffPatientInvoiceController')


const curePatient = express.Router();

curePatient.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);
console.log("aaaaaa");
curePatient.post('/', PatientMedicineInfo.getPatientMedicalRecordInfo);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;    
