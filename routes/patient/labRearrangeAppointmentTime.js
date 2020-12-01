const express = require('express');
const labRearrangeAppointmentTime = require('../../controller/patientController')

const labRearrangeAppontment = express.Router();

labRearrangeAppontment.get('/',(req, res) =>{
    res.render('patient/labRearrangeAppointmentTime');
});

labRearrangeAppontment.post('/', labRearrangeAppointmentTime.updateLabAppointment);

module.exports = labRearrangeAppontment;