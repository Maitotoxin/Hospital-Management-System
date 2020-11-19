const express = require('express');
const patientDoctorInfo = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/', patientDoctorInfo.getPatientDoctorInfo);

module.exports = doctor;