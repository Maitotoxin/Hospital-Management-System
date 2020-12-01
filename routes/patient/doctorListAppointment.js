const express = require('express');
const patientDoctorListAppointment = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/', patientDoctorListAppointment.getPatientDoctorAppointmentInfo);

module.exports = doctor;