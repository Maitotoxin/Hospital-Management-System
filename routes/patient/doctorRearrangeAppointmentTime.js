const express = require('express');
const doctorRearrangeAppointmentTime = require('../../controller/patientDoctorController')

const doctorRearrangeAppontment = express.Router();

doctorRearrangeAppontment.get('/',(req, res) =>{
    res.render('patient/doctorRearrangeAppointmentTime');
});

doctorRearrangeAppontment.post('/', doctorRearrangeAppointmentTime.updateDoctorAppointment);

module.exports = doctorRearrangeAppontment;