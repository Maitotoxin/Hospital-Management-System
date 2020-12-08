const express = require('express');
const doctorAppointmentTime = require('../../controller/patientDoctorController')

const doctorAppontment = express.Router();

doctorAppontment.get('/',(req, res) =>{
    res.render('patient/doctorAppointmentTime');
});

doctorAppontment.post('/', doctorAppointmentTime.createDoctorAppointment);

module.exports = doctorAppontment;