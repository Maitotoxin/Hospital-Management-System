const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
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
exports.getPatientMedicalRecordInfo = getPatientMedicalRecordInfo;
exports.getTreatmentInfoCure = getTreatmentInfoCure;
exports.getIcdInfoCure = getIcdInfoCure;
exports.getMedicineInfoCure = getMedicineInfoCure;
exports.getPatientNewMedicalRecordInfo = getPatientNewMedicalRecordInfo;

function getPatientNewMedicalRecordInfo(req, res, next){
	console.log("enter getPatientNewMedicalRecordInfo");
	console.log(req.body);
	const invoice_no = xss(req.body.invoice_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select a.last_update, a.treatment_id, b.treatment_name, a.times from patient_treatment a inner join treatment b on a.treatment_id = b.treatment_id where a.invoice_no=?'
		connection.query(sql, [invoice_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientTreatmentRecordInfo = result;
			sql = 'select a.last_update, a.medicine_id, b.medicine_name, a.amount from patient_medicine a inner join medicine b on a.medicine_id = b.medicine_id where a.invoice_no=?'
			connection.query(sql, [invoice_no], function (err, result) {
				if (err) {
                	console.log('[SELECT ERROR] - ', err.message);
                	res.send("SQL query error");
                	return;
				}
				patientMedicineRecordInfo = result;
				sql = 'select a.last_update, a.icd_id, b.disease_name from patient_icd a inner join icd b on a.icd_id=b.icd_id where a.invoice_no=?'
				connection.query(sql, [invoice_no], function (err, result) {
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
		var sql = 'select icd_id, disease_name from icd';
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
	console.log(req.body);
	const patient_no = xss(parseInt(req.body.patient_no));
	const function_switch = xss(parseInt(req.body.function_switch));
	const appointment_id = xss(req.body.appointment_id);
	if(function_switch == 1){
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
	else{
		database.setUpDatabase(function (connection) {
			connection.connect();
			var sql = 'select * from invoice where appointment_id = ? and type = "D"';
			connection.query(sql, [appointment_id], function (err, result) {
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					res.send("SQL query error");
					return;
				}
				if (result.length > 0) {
					console.log('Already exists invoice with doctor appointment_id', appointment_id);
					invoiceInfo = result;
					console.log(invoiceInfo);
					res.render('staff/curePatientIcd', {
						invoiceInfo: invoiceInfo
					});
				}
				else{
					sql = 'select * from doctor_appointment where appointment_id = ?';
					connection.query(sql, [appointment_id], function (err, result) {
						if (err) {
							console.log('[SELECT ERROR] - ', err.message);
							res.send("SQL query error");
							return;
						}
						appointment = result[0];
						sql = 'select addtime(?, "14 0:0:0")';
						connection.query(sql, [appointment.appointment_time], function (err, result) {
							if (err) {
								console.log('[SELECT ERROR] - ', err.message);
								res.send("SQL query error");
								return;
							}
							console.log(appointment.appointment_time);
							sql = 'insert into invoice (patient_no, price_paid, appointment_id, type, due_date) value (?,?,?,?,?)'
							var sqlParams = [patient_no, 0, appointment_id, "D", appointment.appointment_time];
							connection.query(sql, sqlParams, function (err, result) {
								if (err) {
									console.log('[SELECT ERROR] - ', err.message);
									res.send("SQL query error");
									return;
								}
								sql = 'select * from invoice where appointment_id = ? and type = "D"';
								console.log('--------------------------INSERT----------------------------')
								console.log('INSERT ID:', result)
								console.log('------------------------------------------------------------')
								connection.query(sql, [appointment_id], function (err, result) {
									if (err) {
										console.log('[SELECT ERROR] - ', err.message);
										res.send("SQL query error");
										return;
									}
									invoiceInfo = result;
									console.log(invoiceInfo);
									res.render('staff/curePatientIcd', {
										invoiceInfo: invoiceInfo
									});
								});
							});
						});
						
					});
				}
	
			});
		});
	}
	
}

function getPatientTreatmentRecordInfo(req, res, next){
	console.log("enter getPatientTreatmentRecordInfo");
	console.log(req.body);
	const patient_no = xss(req.body.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, treatment_id, treatment_name, times from patient_treatment where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientTreatmentRecordInfo = result;
			res.render('staff/curePatientTreatment', {
				patientTreatmentRecordInfo: patientTreatmentRecordInfo
			});
		})
	})
}

function getPatientMedicineRecordInfo(req, res, next){
	console.log("enter getPatientMedicineRecordInfo");
	console.log(req.body);
	const patient_no = xss(req.body.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, medicine_id, medicine_name, amount from patient_medicine where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientMedicineRecordInfo = result;
			res.render('staff/curePatientMedicine', {
				patientMedicineRecordInfo: patientMedicineRecordInfo
			});
		})
	})
}

function getPatientIcdRecordInfo(req, res, next){
	console.log("enter getPatientIcdRecordInfo");
	console.log(req.body);
	const patient_no = xss(req.body.patient_no);
	database.setUpDatabase(function (connection) {
		var sql = 'select last_update, icd_id, disease_name from patient_icd where patient_no=?'
		connection.query(sql, [patient_no], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
			}
			patientIcdRecordInfo = result;
			res.render('staff/curePatientIcd', {
				patientIcdRecordInfo: patientIcdRecordInfo
			});
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