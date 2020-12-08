const express = require('express');
const patientTestInfo = require('../../controller/patientInfoController');

const policy = express.Router();

policy.get('/', patientTestInfo.getPatientTestInfo);

module.exports = policy;