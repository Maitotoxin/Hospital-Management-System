const express = require('express');
const adminDashboard = require('../../controller/dashboardController')

const dashboard = express.Router();


dashboard.get('/', adminDashboard.getAdminInfo);

module.exports = dashboard;