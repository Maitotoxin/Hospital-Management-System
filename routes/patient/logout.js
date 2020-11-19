const express = require('express');
const patientController = require('../../controller/patientController')

const logout = express.Router();

logout.get('/',patientController.logoutPatient);

module.exports = logout;