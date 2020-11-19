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
        maxAge: 0.25 * 60 * 60 * 1000
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
app.use('/patient/login', patientLogin);
app.use('/patient/logout', patientLogout);
app.use('/patient/register', patientRegister);
app.use('/patient/dashboard', patientDashboard);
app.use('/patient/profileUpdate', patientProfileUpdate);
app.use('/patient/doctorInfoDisplay', patientDoctorInfoDisplay);
//listen port 3000
app.listen(3000);
console.log('Server started');
