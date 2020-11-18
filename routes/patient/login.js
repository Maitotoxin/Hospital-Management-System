const express = require('express');
const patientController = require('../../controller/patientController')

const login = express.Router();

login.get('/',(req, res) =>{
    res.render('patient/login');
});

login.post('/', patientController.loginPatient);

module.exports = login;