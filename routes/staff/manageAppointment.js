const express = require('express');
const staffMedicineInfo = require('../../controller/staffInfoController');
const staffManageAppointment = require('../../controller/staffAppointmentController');

const doctor = express.Router();

doctor.get('/', staffMedicineInfo.getDoctorAppointmentInfoWaiting);
doctor.post('/', staffManageAppointment.updateAppointmentValid);
module.exports = doctor;