const express = require('express');
const patientInsuranceCompanyInfo = require('../../controller/patientInfoController');

const policy = express.Router();

policy.get('/', patientInsuranceCompanyInfo.getPatientInsuranceCompanyInfo);

module.exports = policy;