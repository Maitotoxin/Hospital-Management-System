const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getMedicineInfoCure = getMedicineInfoCure;
exports.getMedicineInfo = getMedicineInfo;
exports.getTreatmentInfo = getTreatmentInfo;
exports.getLabInfo = getLabInfo;
exports.getTestInfo = getTestInfo;
exports.getDoctorAppointmentInfoWaiting = getDoctorAppointmentInfoWaiting;
exports.getDoctorAppointmentInfoAccept = getDoctorAppointmentInfoAccept;
exports.getPatientMedicalRecordInfo = getPatientMedicalRecordInfo;
exports.getTreatmentInfoAndPatientTreatmentRecordInfo = getTreatmentInfoAndPatientTreatmentRecordInfo;
exports.getMedicineInfoAndPatientMedicineRecordInfo = getMedicineInfoAndPatientMedicineRecordInfo;
exports.getTreatmentInfoCure = getTreatmentInfoCure;
exports.getIcdInfo = getIcdInfo;
exports.getMedicineInfoCure = getMedicineInfoCure;
exports.getPatientNewMedicalRecordInfo = getPatientNewMedicalRecordInfo;
exports.getPatientInfoForWardIn = getPatientInfoForWardIn;
exports.getHospitalInfoForWardIn = getHospitalInfoForWardIn;
exports.getWardInfoForWardIn = getWardInfoForWardIn;
exports.getPatientInfoForWardOut = getPatientInfoForWardOut;

function getPatientInfoForWardOut(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			staff_no = result[0].staff_no;
			sql = 'select a.appointment_id, a.patient_no, b.first_name, b.last_name, c.invoice_id, d.hospital_id, d.ward_id, e.hospital_name from doctor_appointment a inner join patient b on a.patient_no=b.patient_no inner join invoice c on a.appointment_id=c.appointment_id inner join patient_ward d on c.invoice_id=d.invoice_id inner join hospital e on d.hospital_id=e.hospital_id where a.staff_no=? and b.patient_class="1"  and a.valid="2" and c.type="D" and d.status="0"';
			connection.query(sql, [staff_no], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				patientInfoForWardOut = result;
				res.render('staff/patientWardOutChoosePatient', {
					patientInfoForWardOut: patientInfoForWardOut
				});
			});
		});
	});
}


function getWardInfoForWardIn(req, res, next){
	console.log("enter function getWardInfoForWardIn");
	console.log(req.cookies)
	const hospital_id = xss(parseInt(req.cookies["hospital_id"]));
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select ward_id from ward where hospital_id=? and status="0"';
		connection.query(sql, [hospital_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			wardInfoForWardIn = result;
			//console.log(userInfo);
			res.render('staff/patientWardInChooseWard', {
				wardInfoForWardIn: wardInfoForWardIn
			});
		});  
	});
}

function getHospitalInfoForWardIn(req, res, next){
	console.log("enter function getHospitalInfoForWardIn");
	console.log(req.cookies)
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hospital_id, hospital_name, st_address, city, state, zipcode, phone from hospital';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			hospitalInfoForWardIn = result;
			console.log(result);
			//console.log(userInfo);
			res.render('staff/patientWardInChooseHospital', {
				hospitalInfoForWardIn: hospitalInfoForWardIn
			});
		}); 
	});
}

function getPatientInfoForWardIn(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			staff_no = result[0].staff_no;
			sql = 'select a.appointment_id, a.patient_no, b.first_name, b.last_name, c.invoice_id from doctor_appointment a inner join patient b on a.patient_no=b.patient_no inner join invoice c on a.appointment_id=c.appointment_id where a.staff_no=? and b.patient_class="0" and a.valid="4" and c.type="D"';
			connection.query(sql, [staff_no], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				patientInfoForWardIn = result;
				res.render('staff/patientWardInChoosePatient', {
					patientInfoForWardIn: patientInfoForWardIn
				});
			});
		});
	});
}

function getPatientNewMedicalRecordInfo(req, res, next){
	console.log("enter getPatientNewMedicalRecordInfo");
	const invoice_id = xss(req.session.invoice_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select a.last_update, a.treatment_id, b.treatment_name, a.times from patient_treatment a inner join treatment b on a.treatment_id = b.treatment_id where a.invoice_id=?'
		connection.query(sql, [invoice_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientTreatmentRecordInfo = result;
			sql = 'select a.last_update, a.medicine_id, b.medicine_name, a.amount from patient_medicine a inner join medicine b on a.medicine_id = b.medicine_id where a.invoice_id=?'
			connection.query(sql, [invoice_id], function (err, result) {
				if (err) {
                	console.log('[SELECT ERROR] - ', err.message);
                	res.send("SQL query error");
                	return;
				}
				patientMedicineRecordInfo = result;
				sql = 'select a.last_update, a.icd_id, b.disease_name from patient_icd a inner join icd b on a.icd_id=b.icd_id where a.invoice_id=?'
				connection.query(sql, [invoice_id], function (err, result) {
					if (err) {
                		console.log('[SELECT ERROR] - ', err.message);
                		res.send("SQL query error");
                		return;
					}
					patientIcdRecordInfo = result;
					res.render('staff/curePatientEnsure', {
						patientTreatmentRecordInfo: patientTreatmentRecordInfo,
						patientMedicineRecordInfo: patientMedicineRecordInfo,
						patientIcdRecordInfo: patientIcdRecordInfo
					});
				})
			})
		})
	})
}

function getTreatmentInfoCure(req, res, next){
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
			res.render('staff/curePatientTreatment', {
				treatmentInfo: treatmentInfo
			});
		})
	})
}

function getIcdInfoCure(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select icd_id, disease_name, description from icd';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			icdInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/curePatientIcd', {
				icdInfo: icdInfo
			});
		})
	})
}

function getIcdInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select icd_id, disease_name, description from icd';
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
			medicineInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/curePatientMedicine', {
				medicineInfo: medicineInfo
			});
		})
	})
} 

function getPatientMedicalRecordInfo(req, res, next){
	console.log("enter getPatientMedicalRecordInfo");
	console.log(req.cookies["patient_no"]);
	const patient_no = xss(parseInt(req.cookies["patient_no"]));
	database.setUpDatabase(function (connection) {
		var sql = 'select a.last_update, a.treatment_id, b.treatment_name, a.times from patient_treatment a inner join treatment b on a.treatment_id = b.treatment_id where a.patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send("SQL query error");
				return;
			}
			patientTreatmentRecordInfo = result;
			sql = 'select a.last_update, a.medicine_id, b.medicine_name, a.amount from patient_medicine a inner join medicine b on a.medicine_id = b.medicine_id where a.patient_no=?'
			connection.query(sql, [patient_no], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				patientMedicineRecordInfo = result;
				sql = 'select a.last_update, a.icd_id, b.disease_name from patient_icd a inner join icd b on a.icd_id=b.icd_id where a.patient_no=?'
				connection.query(sql, [patient_no], function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send("SQL query error");
						return;
					}
					patientIcdRecordInfo = result;
					res.render('staff/checkMedicalRecord', {
						patientTreatmentRecordInfo: patientTreatmentRecordInfo,
						patientMedicineRecordInfo: patientMedicineRecordInfo,
						patientIcdRecordInfo: patientIcdRecordInfo
					});
				})
			})
		})
	})
	
}

function getTreatmentInfoAndPatientTreatmentRecordInfo(req, res, next){
	console.log("enter getTreatmentInfoAndPatientTreatmentRecordInfo");
	console.log(req.cookies);
	const appointment_id = xss(parseInt(req.cookies["appointment_id"]));
    const patient_no = xss(parseInt(req.cookies["patient_no"]));
	
	database.setUpDatabase(function (connection) {
		var sql = 'select a.last_update, a.treatment_id, b.treatment_name, a.times from patient_treatment a inner join treatment b on a.treatment_id = b.treatment_id where a.patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientTreatmentRecordInfo = result;
			sql = 'select treatment_id, treatment_name, description, price from treatment';
			connection.query(sql, [], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send('SQL query error');
					return;
				}
				treatmentInfoCure = result;
				//console.log(labIncludingTestInfo);
				res.render('staff/curePatientTreatment', {
					treatmentInfoCure: treatmentInfoCure,
					patientTreatmentRecordInfo: patientTreatmentRecordInfo
				});
			})
		})
	})
}

function getMedicineInfoAndPatientMedicineRecordInfo(req, res, next){
	console.log("enter getMedicineInfoAndPatientMedicineRecordInfo");
	const patient_no = xss(parseInt(req.cookies["patient_no"]));
	database.setUpDatabase(function (connection) {
		var sql = 'select a.last_update, a.medicine_id, b.medicine_name, a.amount from patient_medicine a inner join medicine b on a.medicine_id = b.medicine_id where a.patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientMedicineRecordInfo = result;
			var sql = 'select medicine_id, medicine_name, dose, price, description from medicine';
			connection.query(sql, [], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send('SQL query error');
					return;
				}
				medicineInfoCure = result;
				//console.log(labIncludingTestInfo);
				res.render('staff/curePatientMedicine', {
					medicineInfoCure: medicineInfoCure,
					patientMedicineRecordInfo: patientMedicineRecordInfo
				});
			})

		})
	})
}


function getDoctorAppointmentInfoAccept(req, res, next){ 
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		var sql = 'select * from staff where staff_id = ?'
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
				doctorAppointmentInfoAccept = result;
				res.render('staff/curePatient', {
					doctorAppointmentInfoAccept: doctorAppointmentInfoAccept
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