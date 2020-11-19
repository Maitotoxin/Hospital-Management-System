const express = require('express');
const patientController = require('../../controller/patientController')

const updatePatientInfo = express.Router();

updatePatientInfo.get('/',(req, res) =>{
    res.render('patient/profileUpdate');
});

updatePatientInfo.post('/', patientController.updatePatientProfile);

module.exports = updatePatientInfo;