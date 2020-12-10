const express = require('express');
const staffLabInfo = require('../../controller/staffInfoController');

const policy = express.Router();

policy.get('/', staffLabInfo.getLabInfo);

module.exports = policy;