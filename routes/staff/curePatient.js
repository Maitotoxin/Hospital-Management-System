const express = require('express');

const PatientMedicineInfo = require('../../controller/staffInfoController')
const curePatientMedicine = require('../../controller/staffPatientInvoiceController')


const curePatient = express.Router();

curePatient.get('/', PatientMedicineInfo.getDoctorAppointmentInfoAccept);
//curePatient.post('/', curePatientMedicine.createPatientInvoice);
module.exports = curePatient;    
