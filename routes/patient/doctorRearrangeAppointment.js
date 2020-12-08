const express = require('express');
const patientDoctorRearrangeAppointment = require('../../controller/patientInfoController');
const deletePatientDoctorAppointment = require('../../controller/patientDoctorController');
const doctor = express.Router();

doctor.get('/', patientDoctorRearrangeAppointment.getPatientEditDoctorAppointmentInfo);
doctor.post('/', deletePatientDoctorAppointment.deleteDoctorAppointment);
module.exports = doctor;