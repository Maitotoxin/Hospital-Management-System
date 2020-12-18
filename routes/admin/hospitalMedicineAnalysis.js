const express = require('express');
const adminDashboard = require('../../controller/adminInfoController');
const analysis = require('../../controller/developerController');
const dashboard = express.Router();


dashboard.get('/',adminDashboard.getMedicineInfo);
dashboard.post('/',analysis.medicineAnalysis);

module.exports = dashboard;