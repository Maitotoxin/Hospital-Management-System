const express = require('express');
const patientDoctorInfo = require('../../controller/patientInfoController');

const policy = express.Router();

policy.get('/', patientDoctorInfo.getPatientDoctorInfo);

module.exports = policy;