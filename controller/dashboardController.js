const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getPatientInfo = getPatientInfo;
exports.getStaffInfo = getStaffInfo;

function getPatientInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select patient_id, first_name, last_name, st_address, city, state, zipcode, phone, birthdate, gender, patient_class from patient where patient_id = ?';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			if (result.length == 0) {
				console.log('no such patient');
				res.render('error', 
					'no such patient'
				);
				return;
			}
			patientInfo = result[0];
			common.correctPatientInfo(patientInfo);
			//console.log(userInfo);
			res.render('patient/dashboard', {
				patientInfo: patientInfo
			});
		});
	}); 
}


function getStaffInfo(req, res, next) {
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select staff_id, first_name, last_name, description, st_address, city, state, zipcode, phone, birthdate, gender, staff_class from staff where staff_id = ?';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			if (result.length == 0) {
				console.log('no such staff');
				res.render('error', 
					'no such staff'
				);
				return;
			}
			staffInfo = result[0];
			common.correctStaffInfo(staffInfo);
			//console.log(userInfo);
			res.render('staff/dashboard', {
				staffInfo: staffInfo
			});
		});
	}); 
}