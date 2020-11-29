const express = require('express');
const patientDoctorMakeAppointment = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/', patientDoctorMakeAppointment.getPatientDoctorInfoMakeAppointment);

module.exports = doctor;