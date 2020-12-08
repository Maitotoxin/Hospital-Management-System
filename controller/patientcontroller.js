const database = require('../config/databaseConfig');
const bcrypt = require('bcrypt');
const saltRound = 10;
const xss = require('xss');

exports.createPatient = createPatient;
exports.logoutPatient = logoutPatient;
exports.loginPatient = loginPatient;
exports.updatePatientProfile = updatePatientProfile;
exports.createDoctorAppointment = createDoctorAppointment;
exports.createLabAppointment = createLabAppointment;
exports.updateDoctorAppointment = updateDoctorAppointment;
exports.updateLabAppointment = updateLabAppointment;
exports.deleteDoctorAppointment = deleteDoctorAppointment;
exports.deleteLabAppointment = deleteLabAppointment;

function createPatientInvoice(req, res, next) {
	const userid = xss(req.session.userid);
	const homename = xss(req.body.homename);
	const policyname = xss(req.body.policyname);
	const startdate = xss(req.body.startdate);
	const enddate = xss(req.body.enddate);
	const monthDifference = common.getMonthDifference(startdate, enddate);
	console.log(req.body.homename);
	console.log(req.body.policyname);
	console.log(monthDifference);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var customerSql = 'select * from customer where customer.userid = ? and customer.type = "H"';
		connection.query(customerSql, userid, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			} else if (result.length == 0) {
				var sql = 'insert into customer (type, userid) values ("H", ?)';
				connection.query(sql, userid, function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					}
					console.log('--------------------------INSERT----------------------------')
					console.log('INSERT ID:', result)
					console.log('------------------------------------------------------------')
				});
			} else {
				var sql = 'select amount from policy where policy.policyname = ?'
				connection.query(sql, [policyname], function (err, result) {
					if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
					} else if (result.length == 0) {
						console.log('no such policy');
						res.send('no such policy');
						return;
					} else {
						var price = result[0].amount;
						sql = 'insert into home_policy (userid, startdate, enddate, amount, homename, policyname, paymentduedate, amountpaid) values (?, ?, ?, ?, ?, ?, ?, 0)';
						var sqlParam = [userid, startdate, enddate, price * monthDifference, homename, policyname, enddate];
						console.log(sqlParam);
						connection.query(sql, sqlParam, function (err, result) {
							if (err) {
								console.log('[SELECT ERROR] - ', err.message);
								res.send('SQL query error');
								return;
							}
							console.log('--------------------------INSERT----------------------------')
							console.log('INSERT ID:', result)
							console.log('------------------------------------------------------------')
							connection.end();
							res.redirect(301, '/dashboard');
						});
					}
				});
			}
		});
	});
}

function deleteLabAppointment(req, res, next){
    console.log('enter function deleteLabAppointment');
    console.log(req.body);
    const appointment_id = xss(parseInt(req.body.appointment_id));
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sqlParams = ["3", appointment_id];
        var sql = 'update lab_appointment set valid = ? where appointment_id = ?';
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            connection.end(); 
            res.redirect(301, '/patient/labRearrangeAppointment');

        })
    })
}

function deleteDoctorAppointment(req, res, next){
    console.log('enter function deleteDoctorAppointment');
    console.log(req.body);
    const appointment_id = xss(parseInt(req.body.appointment_id));
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sqlParams = ["3", appointment_id];
        var sql = 'update doctor_appointment set valid = ? where appointment_id = ?';
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            connection.end(); 
            res.redirect(301, '/patient/doctorRearrangeAppointment');

        })
    })
}

function updateLabAppointment(req, res, next){
    console.log('enter function updateLabAppontment');
    console.log(req.body);
    const appointment_id = xss(parseInt(req.body.appointment_id));
    const appointment_time = xss(req.body.appointment_time); 
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sqlParams = [appointment_time, "0", appointment_id];
        var sql = 'update lab_appointment set appointment_time = ?, valid = ? where appointment_id = ?';
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            connection.end(); 
            res.redirect(301, '/patient/labRearrangeAppointment');

        })
    })
}


function updateDoctorAppointment(req, res, next){
    console.log('enter function updateDoctorAppontment');
    console.log(req.body);
    const appointment_id = xss(parseInt(req.body.appointment_id));
    const appointment_time = xss(req.body.appointment_time); 
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sqlParams = [appointment_time, "0", appointment_id];
        var sql = 'update doctor_appointment set appointment_time = ?, valid = ? where appointment_id = ?';
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            connection.end(); 
            res.redirect(301, '/patient/doctorRearrangeAppointment');

        })
    })
}

function createLabAppointment(req, res, next){
    console.log('enter function createLabAppontment');
    console.log(req.body);
    const lab_id = xss(parseInt(req.body.lab_id));
    const patient_id = xss(req.body.patient_id);
    const appointment_time = xss(req.body.appointment_time);
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from patient where patient_id = ?';
        connection.query(sql, [patient_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            patient = result[0];
          
            var addSqlParams = [60, patient.patient_no, lab_id, appointment_time, "0"];
            //console.log(addSqlParams);
            var addSql = 'insert into lab_appointment (estimated_duration, patient_no, lab_id, appointment_time, valid) values (?, ?, ?, ?, ?)';
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                } 
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end(); 
                res.redirect(301, '/patient/dashboard');
            })
        })
    })
}

function createDoctorAppointment(req, res, next){
    console.log('enter function createDoctorAppontment');
    console.log(req.body);
    const staff_no = xss(parseInt(req.body.staff_no));
    const patient_id = xss(req.body.patient_id);
    const appointment_time = xss(req.body.appointment_time); 
    
    //verify
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from patient where patient_id = ?';
        connection.query(sql, [patient_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            patient = result[0];
          
            var addSqlParams = [60, patient.patient_no, staff_no, appointment_time, "0"];
            //console.log(addSqlParams);
            var addSql = 'insert into doctor_appointment (estimated_duration, patient_no, staff_no, appointment_time, valid) values (?, ?, ?, ?, ?)';
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end(); 
                res.redirect(301, '/patient/dashboard');
            })
        })
    })
}

function createPatient(req, res, next) {
    console.log('enter function createPatient');
    console.log(req.body);
    const patient_id = xss(req.body.patient_id);
    const plainTextPassword = xss(req.body.password1);
    const plainTextPasswordAgain = xss(req.body.password2);
    const first_name = xss(req.body.first_name);
    const last_name = xss(req.body.last_name);
    const state = xss(req.body.state);
    const city = xss(req.body.city);
    const st_address = xss(req.body.st_address);
    const zipcode = xss(req.body.zipcode);
    const gender = xss(req.body.gender);
    const birthdate = xss(req.body.birthdate);
    const phone = xss(req.body.phone);

    //verify
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from patient where patient_id = ?';
        connection.query(sql, [patient_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if (result.length > 0) {
                console.log('Already exists patient id', id);
                res.send("Patient already exists");
                return;
            }
            var password = bcrypt.hashSync(plainTextPassword, saltRound);
            var addSqlParams = [patient_id, password, first_name, last_name, state, city, st_address, zipcode, gender, birthdate, phone, "0"];
            //console.log(addSqlParams);
            var addSql = 'insert into patient (patient_id, password, first_name, last_name, state, city, st_address, zipcode, gender, birthdate, phone, patient_class) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end();
                res.redirect(301, '/patient/login');
            })
        })
    })
}

function logoutPatient(req, res, next) {
    req.session.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('/patient/login');
    });
}

function loginPatient(req, res, next) {
    const id = xss(req.body.patient_id);
    const plainTextPassword = xss(req.body.password);
    //verify
    if (id.trim().length == 0) {
        return res.status(400).send('<h4>patient id error</h4>');
    }
    if (plainTextPassword.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select password from patient where patient_id = ?';
        connection.query(sql, [id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if (result.length == 0) {
                console.log('no such patient, please register');
                res.send("no such patient");
                return;
            }
            const patient = result[0]
            bcrypt.compare(plainTextPassword, patient.password, function (err, success) {
                if (err) {
                    console.log('BCRYPT COMPARE ERROR');
                    res.send('BCRYPT COMPARE ERROR');
                    return;
                }
                if (!success) {
                    console.log('password error');
                    res.send('password error');
                    return;
                }
                connection.end();
                req.session.patient_id = id;
                req.app.locals.patient_id = id;
                res.redirect(301, '/patient/dashboard');
            });

        })
    })
}

function updatePatientProfile(req, res, next) {
    console.log('req.body');
    const patient_id = xss(req.session.patient_id);
    const plainTextPassword = xss(req.body.password1);
    const plainTextPasswordAgain = xss(req.body.password2);
    const first_name = xss(req.body.first_name);
    const last_name = xss(req.body.last_name);
    const state = xss(req.body.state);
    const city = xss(req.body.city);
    const st_address = xss(req.body.st_address);
    const zipcode = xss(req.body.zipcode);
    const gender = xss(req.body.gender);
    const birthdate = xss(req.body.birthdate);
    const phone = xss(req.body.phone);
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var password = bcrypt.hashSync(plainTextPassword, saltRound);
        var sql = 'update patient set password = ?, first_name = ?, last_name = ?, state = ?, city = ?, st_address = ?, zipcode = ?, gender = ?, birthdate = ?, phone = ? where patient_id = ?';
        var sqlParams = [password, first_name, last_name, state, city, st_address, zipcode, gender, birthdate, phone, patient_id];
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message)
                res.send("SQL update error");
                return; 
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            //issue 01: 注册成功alert
            connection.end();
            res.redirect(301, '/patient/dashboard');
        })
    })
}