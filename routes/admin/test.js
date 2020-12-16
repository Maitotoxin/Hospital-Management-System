const express = require('express');
const adminDashboard = require('../../controller/developerController')

const dashboard = express.Router();


dashboard.get('/',adminDashboard.test);


module.exports = dashboard;