const express = require('express');
const patientLabRearrangeAppointment = require('../../controller/patientInfoController');
const deletePatientLabAppointment = require('../../controller/patientController');
const lab = express.Router();

lab.get('/', patientLabRearrangeAppointment.getPatientEditLabAppointmentInfo);

lab.post('/', deletePatientLabAppointment.deleteLabAppointment);
module.exports = lab;