const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getPatientHospitalInfo = getPatientHospitalInfo;
exports.getPatientDoctorInfo = getPatientDoctorInfo;
exports.getPatientLabInfo = getPatientLabInfo;
exports.getPatientInsuranceCompanyInfo = getPatientInsuranceCompanyInfo;
exports.getPatientDoctorInfoMakeAppointment = getPatientDoctorInfoMakeAppointment;
exports.getPatientLabInfoMakeAppointment = getPatientLabInfoMakeAppointment;
exports.getPatientDoctorAppointmentInfo = getPatientDoctorAppointmentInfo;
exports.getPatientLabAppointmentInfo = getPatientLabAppointmentInfo;

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

function getPatientInsuranceCompanyInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select provider_id, company_name, discount from insurance_company';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientInsuranceCompanyInfo = result;
			//console.log(userInfo);
			res.render('patient/insuranceCompanyInfoDisplay', {
				patientInsuranceCompanyInfo: patientInsuranceCompanyInfo
			});
		});
	});
} 

function getPatientDoctorInfoMakeAppointment(req, res, next) {
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
			res.render('patient/doctorMakeAppointment', {
				patientDoctorInfo: patientDoctorInfo
			}); 
		});
	});
}  

function getPatientLabInfoMakeAppointment(req, res, next) {
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
			res.render('patient/labMakeAppointment', {
				patientLabInfo: patientLabInfo
			});
		});
	});
}  

function getPatientDoctorAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.appointment_id, a.staff_no, b.first_name, b.last_name, a.appointment_time, a.estimated_duration, a.valid from doctor_appointment a inner join staff b on a.staff_no = b.staff_no having a.valid = ? or a.valid = ?'; 
		var sqlParams = ["0", "1"];
		connection.query(sql, sqlParams, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientDoctorAppointmentInfo = result;
			console.log(patientDoctorAppointmentInfo);
			res.render('patient/doctorRearrangeAppointment', {
				patientDoctorAppointmentInfo: patientDoctorAppointmentInfo
			}); 
		});
	});
}  

function getPatientLabAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sqlParams = ["0", "1"];
		var sql = 'select a.appointment_id, a.lab_id, b.lab_name, a.appointment_time, a.estimated_duration, a.valid from lab_appointment a inner join lab b on a.lab_id = b.lab_id where a.valid = ? or a.valid=?';
		connection.query(sql, sqlParams, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientLabAppointmentInfo = result;
			console.log(patientLabAppointmentInfo);
			res.render('patient/labRearrangeAppointment', {
				patientLabAppointmentInfo: patientLabAppointmentInfo
			});
		});
	});
}  