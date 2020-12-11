const database = require('../config/databaseConfig');
const xss = require('xss');

exports.createDoctorAppointment = createDoctorAppointment;
exports.updateDoctorAppointment = updateDoctorAppointment;
exports.deleteDoctorAppointment = deleteDoctorAppointment;


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
          
            var addSqlParams = [ patient.patient_no, staff_no, appointment_time, "0"];
            //console.log(addSqlParams);
            var addSql = 'insert into doctor_appointment ( patient_no, staff_no, appointment_time, valid) values (?, ?, ?, ?)';
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
