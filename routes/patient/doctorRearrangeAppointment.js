const express = require('express');
const patientDoctorRearrangeAppointment = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/', patientDoctorRearrangeAppointment.getPatientDoctorAppointmentInfo);

module.exports = doctor;