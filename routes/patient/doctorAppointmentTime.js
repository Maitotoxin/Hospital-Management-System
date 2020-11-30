const express = require('express');
const doctorAppointmentTime = require('../../controller/patientController')

const doctorAppontment = express.Router();

doctorAppontment.get('/',(req, res) =>{
    res.render('patient/doctorAppointmentTime');
});

doctorAppontment.post('/', doctorAppointmentTime.createDoctorAppointment);

module.exports = doctorAppontment;