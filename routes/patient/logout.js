const express = require('express');
const patientController = require('../../controller/patientcontroller')

const logout = express.Router();

logout.get('/',patientController.logoutPatient);

module.exports = logout;