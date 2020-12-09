const express = require('express');
const staffDashboard = require('../../controller/dashboardController')

const dashboard = express.Router();


dashboard.get('/',staffDashboard.getStaffInfo);


module.exports = dashboard;