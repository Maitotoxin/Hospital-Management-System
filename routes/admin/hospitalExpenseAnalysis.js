const express = require('express');
const analysis = require('../../controller/developerController');
const dashboard = express.Router();

dashboard.get('/',analysis.medicineAnalysis);

module.exports = dashboard;