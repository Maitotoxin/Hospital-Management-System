const express = require('express');
const path = require('path');
const session = require('express-session');
// use body-parser module  to handle post
const bodyparser = require('body-parser');
const app = express();

//use body-parser handle all get/post rquest
app.use(bodyparser.urlencoded({extended: false}));

app.use(session({
    secret: 'Dymatize Accelerate Wallet',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
})); 

//art directory
app.set('views', path.join(__dirname, 'views'));
//tell express standard attribute
app.set('view engine', 'art');

//tell standard engine for attribute
app.engine('art', require('express-art-template'));
 
//open static directory
app.use(express.static(path.join(__dirname, 'static')));
const error = require('./routes/error');

const patientLogin = require('./routes/patient/login');
const patientLogout = require('./routes/patient/logout');
const patientRegister = require('./routes/patient/register');
const patientDashboard = require('./routes/patient/dashboard');
const patientProfileUpdate = require('./routes/patient/profileUpdate');
const patientDoctorInfoDisplay = require('./routes/patient/doctorInfoDisplay');
const patientLabInfoDisplay = require('./routes/patient/labInfoDisplay');
const patientTestInfoDisplay = require('./routes/patient/testInfoDisplay');
const patientHospitalInfoDisplay = require('./routes/patient/hospitalInfoDisplay');
const patientInsuranceCompanyInfoDisplay = require('./routes/patient/insuranceCompanyInfoDisplay');
const patientDoctorMakeAppointment = require('./routes/patient/doctorMakeAppointment');
const patientDoctorAppointmentTime = require('./routes/patient/doctorAppointmentTime');
const patientDoctorRearrangeAppointment = require('./routes/patient/doctorRearrangeAppointment');
const patientDoctorListAppointment = require('./routes/patient/doctorListAppointment');
const patientDoctorRearrangeAppointmentTime = require('./routes/patient/doctorRearrangeAppointmentTime');
const patientTestMakeAppointment = require('./routes/patient/testMakeAppointment');
const patientLabMakeAppointment = require('./routes/patient/labMakeAppointment');
const patientLabAppointmentTime = require('./routes/patient/labAppointmentTime');

const patientLabListAppointment = require('./routes/patient/labListAppointment');
const patientInvoiceDisplay = require('./routes/patient/invoiceDisplay');
const patientInvoicePayDisplay = require('./routes/patient/invoicePayDisplay');
const patientInvoicePay = require('./routes/patient/invoicePay');
//const patientLabRearrangeAppointmentTime = require('./routes/patient/labRearrangeAppointmentTime');
const staffLogin = require('./routes/staff/login');
const staffLogout = require('./routes/staff/logout');
const staffRegister = require('./routes/staff/register');
const staffDashboard = require('./routes/staff/dashboard');
const staffProfileUpdate = require('./routes/staff/profileUpdate');
//app.use('',error)
app.use('/patient/login', patientLogin);
app.use('/patient/logout', patientLogout);
app.use('/patient/register', patientRegister); 
app.use('/patient/dashboard', patientDashboard);
app.use('/patient/profileUpdate', patientProfileUpdate);
app.use('/patient/doctorInfoDisplay', patientDoctorInfoDisplay);
app.use('/patient/labInfoDisplay', patientLabInfoDisplay); 
app.use('/patient/testInfoDisplay', patientTestInfoDisplay);
app.use('/patient/hospitalInfoDisplay', patientHospitalInfoDisplay);
app.use('/patient/insuranceCompanyInfoDisplay', patientInsuranceCompanyInfoDisplay);
app.use('/patient/doctorMakeAppointment', patientDoctorMakeAppointment);
app.use('/patient/doctorAppointmentTime', patientDoctorAppointmentTime);
app.use('/patient/doctorRearrangeAppointment', patientDoctorRearrangeAppointment);
app.use('/patient/doctorListAppointment', patientDoctorListAppointment);
app.use('/patient/doctorRearrangeAppointmentTime', patientDoctorRearrangeAppointmentTime);
app.use('/patient/testMakeAppointment', patientTestMakeAppointment);
app.use('/patient/labMakeAppointment', patientLabMakeAppointment);
app.use('/patient/labAppointmentTime', patientLabAppointmentTime);
//app.use('/patient/labRearrangeAppointment', patientLabRearrangeAppointment);
///app.use('/patient/labRearrangeAppointmentTime', patientLabRearrangeAppointmentTime);
app.use('/patient/labListAppointment', patientLabListAppointment);
app.use('/patient/invoiceDisplay',patientInvoiceDisplay);
app.use('/patient/invoicePayDisplay',patientInvoicePayDisplay); 
app.use('/patient/invoicePay',patientInvoicePay);

app.use('/staff/login', staffLogin);
app.use('/staff/logout', staffLogout);
app.use('/staff/register', staffRegister);
app.use('/staff/dashboard', staffDashboard);
app.use('/staff/profileUpdate', staffProfileUpdate);
//listen port 3000 
app.listen(3000);
console.log('Server started'); 
  