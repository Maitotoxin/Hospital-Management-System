const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getWaitingAppointment = getWaitingAppointment;
exports.getMedicineInfoCure = getMedicineInfoCure;
exports.getMedicineInfo = getMedicineInfo;
exports.getIcdInfo = getIcdInfo;
exports.getTreatmentInfo = getTreatmentInfo;
exports.getLabInfo = getLabInfo;
exports.getTestInfo = getTestInfo;
exports.getDoctorAppointmentInfoWaiting = getDoctorAppointmentInfoWaiting;
exports.getDoctorAppointmentInfoAccept = getDoctorAppointmentInfoAccept;
exports.getPatientIcdRecordInfo = getPatientIcdRecordInfo;
exports.getPatientMedicineRecordInfo = getPatientMedicineRecordInfo;
exports.getPatientTreatmentRecordInfo = getPatientTreatmentRecordInfo;

function getPatientTreatmentRecordInfo(req, res, next){
	const patient_no = xss(req.session.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, treatment_id, treatment_name, times from patient_treatment where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientTreatmentRecordInfo = result;
			res.render('staff/checkMedicalRecord', {
				patientTreatmentRecordInfo: patientTreatmentRecordInfo
			});
		})
	})
}

function getPatientMedicineRecordInfo(req, res, next){
	const patient_no = xss(req.session.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, medicine_id, medicine_name, amount from patient_medicine where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientMedicineRecordInfo = result;
			res.render('staff/checkMedicalRecord', {
				patientMedicineRecordInfo: patientMedicineRecordInfo
			});
		})
	})
}

function getPatientIcdRecordInfo(req, res, next){
	const patient_no = xss(req.session.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, icd_id, disease_name from patient_icd where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientIcdRecordInfo = result;
			res.render('staff/checkMedicalRecord', {
				patientIcdRecordInfo: patientIcdRecordInfo
			});
		})
	})
}

function getDoctorAppointmentInfoAccept(req, res, next){ 
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			staff = result[0];
			sql = 'select a.appointment_id, a.patient_no, a.appointment_time, a.valid, b.first_name, b.last_name from doctor_appointment a inner join patient b on a.patient_no = b.patient_no where a.staff_no=? and a.valid="1"';
			connection.query(sql, [staff.staff_no], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send('SQL query error');
					return;
				}
				doctorAppointmentInfoWaiting = result;
				res.render('staff/manageAppointment', {
					doctorAppointmentInfoWaiting: doctorAppointmentInfoWaiting
				});
			})
		})
		

	})
}

function getDoctorAppointmentInfoWaiting(req, res, next){ 
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			staff = result[0];
			sql = 'select a.appointment_id, a.patient_no, a.appointment_time, a.valid, b.first_name, b.last_name from doctor_appointment a inner join patient b on a.patient_no = b.patient_no where a.staff_no=? and a.valid="0"';
			connection.query(sql, [staff.staff_no], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send('SQL query error');
					return;
				}
				doctorAppointmentInfoWaiting = result;
				res.render('staff/manageAppointment', {
					doctorAppointmentInfoWaiting: doctorAppointmentInfoWaiting
				});
			})
		})
		

	})
}

function getTestInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select test_id, test_name, description, price from test';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			testInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/testInfoDisplay', {
				testInfo: testInfo
			});
		})
	})
}

function getLabInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select lab_id, lab_name, description from lab';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			labInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/labInfoDisplay', {
				labInfo: labInfo
			});
		})
	})
}

function getTreatmentInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select treatment_id, treatment_name, description, price from treatment';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			treatmentInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/treatmentInfoDisplay', {
				treatmentInfo: treatmentInfo
			});
		})
	})
}

function getIcdInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select icd_id, disease_name from icd';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			icdInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/icdInfoDisplay', {
				icdInfo: icdInfo
			});
		})
	})
}

function getMedicineInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select medicine_id, medicine_name, dose, price, description from medicine';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			medicineInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/medicineInfoDisplay', {
				medicineInfo: medicineInfo
			});
		})
	})
}

function getWaitingAppointment(req, res, next){
	const staff_id = xss(req.session.staff_id);
}

function getMedicineInfoCure(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select medicine_id, medicine_name, dose, price, description from medicine';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			medicineInfoCure = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/curePatientMedicine', {
				medicineInfoCure: medicineInfoCure
			});
		})
	})
}