const express = require('express');
const patientController = require('../../controller/patientController')

const register = express.Router();

register.get('/',(req, res) =>{
    res.render('patient/register');
});

register.post('/', patientController.createPatient);

module.exports = register;