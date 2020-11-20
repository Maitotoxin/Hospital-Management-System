const express = require('express');
const patientHospitalInfo = require('../../controller/patientInfoController');

const policy = express.Router();

policy.get('/', patientHospitalInfo.getPatientHospitalInfo);

module.exports = policy;