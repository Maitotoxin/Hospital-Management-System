const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffPatientInvoiceController')


const curePatient = express.Router();

curePatient.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);

curePatient.post('views/staff/curePatient', PatientMedicineInfo.getPatientMedicalRecordInfo);
curePatient.post('/staff/createPatientInvoice', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;   