const express = require('express');
const patientLabAppointmentInfo = require('../../controller/patientInfoController');

const lab = express.Router();

lab.get('/', patientLabAppointmentInfo.getPatientLabAppointmentInfo);
module.exports = lab;