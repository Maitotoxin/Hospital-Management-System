const express = require('express');
const staffICDInfo = require('../../controller/staffInfoController');

const policy = express.Router();

policy.get('/', staffICDInfo.getIcdInfo);

module.exports = policy;