const express = require('express');
const patientTestMakeAppointment = require('../../controller/patientInfoController');

const test = express.Router();

test.get('/', patientTestMakeAppointment.getPatientTestInfoMakeAppointment);
test.post('/', patientTestMakeAppointment.getPatientLabInfoIncludingTest);

module.exports = test;