const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getPatientHospitalInfo = getPatientHospitalInfo;
exports.getPatientDoctorInfo = getPatientDoctorInfo;
exports.getPatientLabInfo = getPatientLabInfo;

function getPatientHospitalInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hospital_id, hospital_name, st_address, city, state, zipcode, phone, maximun_patients from hospital';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientHospitalInfo = result;
			//console.log(userInfo);
			res.render('patient/hospitalInfoDisplay', {
				patientHospitalInfo: patientHospitalInfo
			});
		}); 
	});
} 

function getPatientDoctorInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select staff_no, first_name, last_name, gender, phone, description from staff where staff_class = "D"';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientDoctorInfo = result;
			console.log(patientDoctorInfo);
			res.render('patient/doctorInfoDisplay', {
				patientDoctorInfo: patientDoctorInfo
			});
		});
	});
}

function getPatientLabInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select lab_id, lab_name, description from lab';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientLabInfo = result;
			//console.log(userInfo);
			res.render('patient/labInfoDisplay', {
				patientLabInfo: patientLabInfo
			});
		});
	});
}