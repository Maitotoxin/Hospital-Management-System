const express = require('express');
const patientLabAppointmentInfo = require('../../controller/patientInfoController');

const lab = express.Router();

lab.get('/',(req,res)=>{
    res.render('patient/labListAppointment');
});
lab.post('/', patientLabAppointmentInfo.getPatientLabAppointmentInfo);
module.exports = lab;