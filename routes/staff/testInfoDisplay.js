const express = require('express');
const staffMedicineInfo = require('../../controller/staffInfoController');

const policy = express.Router();

policy.get('/', staffMedicineInfo.getTestInfo);

module.exports = policy;