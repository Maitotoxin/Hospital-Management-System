const express = require('express');
const patientLabRearrangeAppointment = require('../../controller/patientInfoController');

const lab = express.Router();

lab.get('/', patientLabRearrangeAppointment.getPatientLabAppointmentInfo);

lab.post('/', patientLabRearrangeAppointment.deletePatientLabAppointmentInfo);
module.exports = lab;