const express = require('express');
const staffTestInfo = require('../../controller/staffInfoController');

const policy = express.Router();

policy.get('/', staffTestInfo.getTestInfo);

module.exports = policy;