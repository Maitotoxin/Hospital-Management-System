const express = require('express');
const adminDashboard = require('../../controller/adminInfoController');
const analysis = require('../../controller/developerController');
const dashboard = express.Router();


dashboard.get('/',adminDashboard.getIcdInfo);
dashboard.post('/',analysis.icdAnalysis);

module.exports = dashboard;