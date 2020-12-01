const express = require('express');
const patientDoctorRearrangeAppointment = require('../../controller/patientInfoController');
const deletePatientDoctorAppointment = require('../../controller/patientController');
const doctor = express.Router();

doctor.get('/', patientDoctorRearrangeAppointment.getPatientDoctorAppointmentInfo);
doctor.post('/', deletePatientDoctorAppointment.deleteDoctorAppointment);
module.exports = doctor;