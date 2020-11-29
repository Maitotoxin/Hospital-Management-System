const express = require('express');
const doctorAppointmentTime = require('../../controller/patientController')

const register = express.Router();

register.get('/',(req, res) =>{
    res.render('patient/doctorAppointmentTime');
});

register.post('/', doctorAppointmentTime.createDoctorAppointment);

module.exports = register;