const express = require('express');
const patientTestMakeAppointment = require('../../controller/patientInfoController');

const test = express.Router();

test.get('/', patientTestMakeAppointment.getPatientTestInfoMakeAppointment);

module.exports = test;