const express = require('express');
const analysis = require('../../controller/developerController');
const dashboard = express.Router();

dashboard.get('/',analysis.icdExpenseAnalysis);

module.exports = dashboard;