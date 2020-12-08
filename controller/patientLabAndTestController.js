const database = require('../config/databaseConfig');
const xss = require('xss');

exports.createLabAppointment = createLabAppointment;
exports.updateLabAppointment = updateLabAppointment;
exports.deleteLabAppointment = deleteLabAppointment;

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
