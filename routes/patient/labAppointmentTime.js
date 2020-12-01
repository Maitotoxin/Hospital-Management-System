const express = require('express');
const labAppointmentTime = require('../../controller/patientController')

const labAppontment = express.Router();

labAppontment.get('/',(req, res) =>{
    res.render('patient/labAppointmentTime');
});

labAppontment.post('/', labAppointmentTime.createLabAppointment);

module.exports = labAppontment;