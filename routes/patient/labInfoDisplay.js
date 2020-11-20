const express = require('express');
const patientLabInfo = require('../../controller/patientInfoController');

const policy = express.Router();

policy.get('/', patientLabInfo.getPatientLabInfo);

module.exports = policy;