const express = require('express');
const path = require('path');
const session = require('express-session');
// use body-parser module  to handle post
const bodyparser = require('body-parser');
const app = express();
var oracledb = require('oracledb');


//use body-parser handle all get/post rquest
app.use(bodyparser.urlencoded({extended: false}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(session({
    secret: 'Dymatize Accelerate Wallet',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
})); 
oracledb.initOracleClient({libDir: 'D:/oracle/instantclient_19_9'});

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
const patientMedicalRecord=require('./routes/patient/medicalRecord');
//const patientLabRearrangeAppointmentTime = require('./routes/patient/labRearrangeAppointmentTime');
const staffLogin = require('./routes/staff/login');
const staffLogout = require('./routes/staff/logout');
const staffRegister = require('./routes/staff/register');
const staffDashboard = require('./routes/staff/dashboard');
const staffProfileUpdate = require('./routes/staff/profileUpdate');
const staffMedicineInfoDisplay = require('./routes/staff/medicineInfoDisplay');
const staffICDInfoDisplay = require('./routes/staff/icdInfoDisplay');
const staffTreatmentInfoDisplay = require('./routes/staff/treatmentInfoDisplay');
const staffTestInfoDisplay = require('./routes/staff/testInfoDisplay');
const staffLabInfoDisplay = require('./routes/staff/labInfoDisplay');
const staffManageAppointment = require('./routes/staff/manageAppointment');
const staffCurePatient = require('./routes/staff/curePatient');
const staffCheckMedicalRecord = require('./routes/staff/checkMedicalRecord');
const staffCurePatientMedicine = require('./routes/staff/curePatientMedicine');
const staffCurePatientTreatment = require('./routes/staff/curePatientTreatment');
const staffCurePatientIcd = require('./routes/staff/curePatientIcd');
const staffCurePatientEnsure = require('./routes/staff/curePatientEnsure');
const staffPatientWardInChoosePatient = require('./routes/staff/patientWardInChoosePatient');
const staffPatientWardInChooseHospital = require('./routes/staff/patientWardInChooseHospital');
const staffPatientWardInChooseWard = require('./routes/staff/patientWardInChooseWard');
const staffPatientWardOutChoosePatient = require('./routes/staff/patientWardOutChoosePatient');

const adminLogin = require('./routes/admin/login');
const adminRegister = require('./routes/admin/register');
const adminLogout = require('./routes/admin/adminLogout');
const adminDashboard = require('./routes/admin/dashboard');
const test = require('./routes/admin/hospitalAnalysis');


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
///app.use('/patient/labRearrangeAppointment', patientLabRearrangeAppointment);
//app.use('/patient/labRearrangeAppointmentTime', patientLabRearrangeAppointmentTime);
app.use('/patient/labListAppointment', patientLabListAppointment);
app.use('/patient/invoiceDisplay',patientInvoiceDisplay);
app.use('/patient/invoicePayDisplay',patientInvoicePayDisplay); 
app.use('/patient/invoicePay',patientInvoicePay);
app.use('/patient/medicalRecord', patientMedicalRecord);

app.use('/staff/login', staffLogin);
app.use('/staff/logout', staffLogout);
app.use('/staff/register', staffRegister);
app.use('/staff/dashboard', staffDashboard);
app.use('/staff/profileUpdate', staffProfileUpdate);
app.use('/staff/icdInfoDisplay', staffICDInfoDisplay);
app.use('/staff/medicineInfoDisplay', staffMedicineInfoDisplay);
app.use('/staff/treatmentInfoDisplay', staffTreatmentInfoDisplay);
app.use('/staff/testInfoDisplay', staffTestInfoDisplay);
app.use('/staff/labInfoDisplay', staffLabInfoDisplay);
app.use('/staff/manageAppointment', staffManageAppointment);
app.use('/staff/curePatient',staffCurePatient);
app.use('/staff/checkMedicalRecord',staffCheckMedicalRecord);
app.use('/staff/curePatientMedicine',staffCurePatientMedicine);
app.use('/staff/curePatientTreatment',staffCurePatientTreatment);
app.use('/staff/curePatientIcd',staffCurePatientIcd);
app.use('/staff/curePatientEnsure',staffCurePatientEnsure);
app.use('/staff/patientWardInChoosePatient', staffPatientWardInChoosePatient);
app.use('/staff/patientWardInChooseHospital', staffPatientWardInChooseHospital);
app.use('/staff/patientWardInChooseWard', staffPatientWardInChooseWard);
app.use('/staff/patientWardOutChoosePatient', staffPatientWardOutChoosePatient)



app.use('/admin/login', adminLogin);
app.use('/admin/register', adminRegister);
app.use('/admin/dashboard', adminDashboard);
app.use('/admin/logout', adminLogout);
app.use('/admin/hospitalAnalysis', test);
/*
///////////////////////////
/*
try {
    oracledb.initOracleClient({libDir: 'D:/oracle/instantclient_19_9'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }
    */
   /*
var config = {
    user:'dws1',　　//用户名
    password:'dws',　　//密码
    //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
    connectString : "localhost:1521/ORCL"
  };
 // connection =await oracledb.getConnection(config);

  oracledb.getConnection(
    config,
    function(err, connection)
    {
      if (err) {
        console.error(err.message);
        return;
      }
  　　//查询某表十条数据测试，注意替换你的表名
      var sql ='SELECT * FROM TABLE3'
      connection.execute(sql, [], 
        function(err, result)
        {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          console.log("AA");
          //打印返回的表结构
          console.log(result);
          //打印返回的行数据
          //console.log(result.rows);
        });
    });
  
  function doRelease(connection)
  {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message); 
        }
      });
  }
  */

//listen port 3000 
app.listen(3000);
console.log('Server started'); 



  