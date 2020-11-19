const express = require('express');
const patientDashboard = require('../../controller/dashboardController')

const dashboard = express.Router();


dashboard.get('/',patientDashboard.getPatientInfo);


module.exports = dashboard;