const express = require('express');
const patientDoctorAppointmentInfo = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/', patientDoctorAppointmentInfo.getPatientDoctorAppointmentInfo);
module.exports = doctor;