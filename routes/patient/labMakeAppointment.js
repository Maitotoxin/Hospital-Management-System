const express = require('express');
const patientLabMakeAppointment = require('../../controller/patientInfoController');

const lab = express.Router();

lab.get('/', patientLabMakeAppointment.getPatientLabInfoMakeAppointment);

module.exports = lab;