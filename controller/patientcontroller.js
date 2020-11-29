const database = require('../config/databaseConfig');
const bcrypt = require('bcrypt');
const saltRound = 10;
const xss = require('xss');

exports.createPatient = createPatient;
exports.logoutPatient = logoutPatient;
exports.loginPatient = loginPatient;
exports.updatePatientProfile = updatePatientProfile;
exports.createDoctorAppointment = createDoctorAppointment;

function createDoctorAppointment(req, res, next){
    console.log('enter function createAppontment');
    console.log(req.body);
    const staff_no = xss(req.body.staff_no);
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