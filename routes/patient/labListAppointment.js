const express = require('express');
const patientLabListAppointment = require('../../controller/patientInfoController');

const lab = express.Router();

lab.get('/', patientLabListAppointment.getPatientLabAppointmentInfo);


module.exports = lab;