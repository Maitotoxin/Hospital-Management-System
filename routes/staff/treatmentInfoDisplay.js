const express = require('express');
const staffTreatmentInfo = require('../../controller/staffInfoController');

const policy = express.Router();

policy.get('/', staffTreatmentInfo.getTreatmentInfo);

module.exports = policy;