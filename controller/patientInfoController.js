const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getPatientHospitalInfo = getPatientHospitalInfo;
exports.getPatientDoctorInfo = getPatientDoctorInfo;
exports.getPatientLabInfo = getPatientLabInfo;
exports.getPatientInsuranceCompanyInfo = getPatientInsuranceCompanyInfo;
exports.getPatientDoctorInfoMakeAppointment = getPatientDoctorInfoMakeAppointment;
exports.getPatientLabInfoMakeAppointment = getPatientLabInfoMakeAppointment;
exports.getPatientEditDoctorAppointmentInfo = getPatientEditDoctorAppointmentInfo;
exports.getPatientEditLabAppointmentInfo = getPatientEditLabAppointmentInfo;
exports.getPatientDoctorAppointmentInfo = getPatientDoctorAppointmentInfo;
exports.getPatientLabAppointmentInfo = getPatientLabAppointmentInfo;
exports.getPatientTestInfo = getPatientTestInfo;
exports.getPatientTestInfoMakeAppointment = getPatientTestInfoMakeAppointment;
exports.getPatientLabInfoIncludingTest = getPatientLabInfoIncludingTest;
exports.getInvoiceInfo = getInvoiceInfo;
exports.getUnpaidInvoiceInfo = getUnpaidInvoiceInfo;

function getInvoiceInfo(req, res, next){
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from patient where patient_id = ?';
        connection.query(sql, [patient_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patient_no = result[0].patient_no;
			sql = 'select invoice_id, type, appointment_id, price, price_paid, due_date from invoice where patient_no = ?';
			connection.query(sql, [patient_no], function (err, result){
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				getInvoiceInfo = result;
				res.render('patient/invoiceDisplay', {
					getInvoiceInfo: getInvoiceInfo
				});
			})
		})
	}) 
}

function getUnpaidInvoiceInfo(req, res, next){
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from patient where patient_id = ?';
        connection.query(sql, [patient_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patient_no = result[0].patient_no;
			sql = 'select invoice_id, type, appointment_id, price, price_paid, (price-price_paid) price_unpaid, due_date from invoice where patient_no=? and price>price_paid';
			connection.query(sql, [patient_no], function (err, result){
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				getUnpaidInvoiceInfo = result;
				res.render('patient/invoicePayDisplay', {
					getUnpaidInvoiceInfo: getUnpaidInvoiceInfo
				});
			})
		})
	}) 
}

function getPatientLabInfoIncludingTest(req, res, next){
	const test_id = xss(parseInt(req.body.test_id));
	console.log(test_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select a.lab_id, a.lab_name, a.description from lab a inner join test_lab b on a.lab_id = b.lab_id where b.test_id = ?';
		connection.query(sql, [test_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			labIncludingTestInfo = result;
			console.log(labIncludingTestInfo);
			res.render('patient/labMakeAppointment', {
				labIncludingTestInfo: labIncludingTestInfo
			});
		}); 
	}); 
}

function getPatientTestInfoMakeAppointment(req, res, next){
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select test_id, test_name, description, price from test';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientTestInfo = result;
			//console.log(userInfo);
			res.render('patient/testMakeAppointment', {
				patientTestInfo: patientTestInfo
			});
		});
	});
}

function getPatientTestInfo(req, res, next){
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select test_id, test_name, description, price from test';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientTestInfo = result;
			//console.log(userInfo);
			res.render('patient/testInfoDisplay', {
				patientTestInfo: patientTestInfo
			});
		});
	});
}

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

function getPatientEditDoctorAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.appointment_id, a.staff_no, b.first_name, b.last_name, a.appointment_time, a.valid from doctor_appointment a inner join staff b on a.staff_no = b.staff_no where (a.valid = ? or a.valid = ?) and a.patient_no = (select patient_no from patient where patient_id = ?)'; 
		var sqlParams = ["0", "1", patient_id];
		connection.query(sql, sqlParams, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientDoctorAppointmentInfo = result;
			common.correctAppointmentInfo(patientDoctorAppointmentInfo);
			//console.log(patientDoctorAppointmentInfo);
			res.render('patient/doctorRearrangeAppointment', {
				patientDoctorAppointmentInfo: patientDoctorAppointmentInfo
			}); 
		});
	}); 
}  

function getPatientEditLabAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sqlParams = ["0", "1", patient_id];
		var sql = 'select a.appointment_id, a.lab_id, b.lab_name, a.appointment_time, a.valid from lab_appointment a inner join lab b on a.lab_id = b.lab_id where (a.valid = ? or a.valid=?) and a.patient_no = (select patient_no from patient where patient_id = ?)';
		connection.query(sql, sqlParams, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientLabAppointmentInfo = result;
			common.correctAppointmentInfo(patientLabAppointmentInfo);
			console.log(patientLabAppointmentInfo);
			res.render('patient/labRearrangeAppointment', {
				patientLabAppointmentInfo: patientLabAppointmentInfo
			});
		});
	});
}  

function getPatientDoctorAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.appointment_id, a.staff_no, b.first_name, b.last_name, a.appointment_time, a.valid from doctor_appointment a inner join staff b on a.staff_no = b.staff_no where a.patient_no = (select patient_no from patient where patient_id = ?)'; 
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientDoctorListAppointmentInfo = result;
			common.correctAppointmentInfo(patientDoctorListAppointmentInfo);
			console.log(patientDoctorListAppointmentInfo);
			res.render('patient/doctorListAppointment', {
				patientDoctorListAppointmentInfo: patientDoctorListAppointmentInfo
			}); 
		});
	});
}  

function getPatientLabAppointmentInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select a.appointment_id, a.lab_id, b.lab_name, a.test_id, c.test_name, a.appointment_time, a.valid from test_appointment a inner join lab b on a.lab_id = b.lab_id inner join test c on a.test_id=c.test_id where a.patient_no = (select patient_no from patient where patient_id = ?)';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			patientLablistAppointmentInfo = result;
			common.correctAppointmentInfo(patientLablistAppointmentInfo);
			console.log(patientLablistAppointmentInfo);
			res.render('patient/labListAppointment', { 
				patientLablistAppointmentInfo: patientLablistAppointmentInfo
			});
		});
	});
}  
