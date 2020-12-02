const express = require('express');
const patientDoctorAppointmentInfo = require('../../controller/patientInfoController');

const doctor = express.Router();

doctor.get('/',(req,res)=>{
    res.render('patient/doctorListAppointment');
});
doctor.post('/', patientDoctorAppointmentInfo.getPatientDoctorAppointmentInfo);
module.exports = doctor;