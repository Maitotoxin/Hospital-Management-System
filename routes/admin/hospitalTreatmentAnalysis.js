const express = require('express');
const adminDashboard = require('../../controller/adminInfoController');
const analysis = require('../../controller/developerController');
const dashboard = express.Router();


dashboard.get('/',adminDashboard.getTreatmentInfo);
dashboard.post('/',analysis.treatmentAnalysis);

module.exports = dashboard;