const database = require('../config/databaseConfig');
const xss = require('xss');
exports.createPatientWardIn = createPatientWardIn;
exports.createPatientWardOut = createPatientWardOut;

function createPatientWardOut(req, res, next){
    console.log("enter function createPatientWardOut");
    const ward_id = xss(parseInt(req.body.ward_id));
    const patient_no = xss(parseInt(req.body.patient_no));
    const invoice_id = xss(parseInt(req.body.invoice_id));
    database.setUpDatabase(function (connection) {
        sql = 'update patient set patient_class="0" where patient_no=?';
        connection.query(sql, [patient_no], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            sql = 'update ward set status="0" where ward_id=?';
            connection.query(sql, [ward_id], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                sql = 'update patient_ward set status="1" where invoice_id=?';
                connection.query(sql, [invoice_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    console.log('--------------------------UPDATE----------------------------')
                    console.log('UPDATE ID:', result)
                    console.log('------------------------------------------------------------')
                    connection.end(); 
                    res.redirect(301, '/staff/dashboard');

                });

            });
        });
    });
}

function createPatientWardIn(req, res, next){
    console.log("enter function createPatientWardIn");
    console.log(req.cookies);
    const hospital_id = xss(parseInt(req.cookies["hospital_id"]));
    const invoice_id = xss(parseInt(req.cookies["invoice_id"]));
    const patient_no = xss(parseInt(req.cookies["patient_no"]));
    const appointment_id = xss(parseInt(req.cookies["appointment_id"]));
    const ward_id = xss(parseInt(req.body.ward_id));
    database.setUpDatabase(function (connection) {
		var sql = 'insert into patient_ward (invoice_id, patient_no, ward_id, hospital_id) values (?,?,?,?)';
		connection.query(sql, [invoice_id,patient_no, ward_id,hospital_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            sql = 'update patient set patient_class="1" where patient_no=?';
            connection.query(sql, [patient_no], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                sql = 'update ward set status="1" where ward_id=?';
                connection.query(sql, [ward_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    sql = 'update doctor_appointment set valid="2" where appointment_id=?';
                    connection.query(sql, [appointment_id], function (err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            res.send("SQL query error");
                            return;
                        }
                        console.log('--------------------------UPDATE----------------------------')
                        console.log('UPDATE ID:', result)
                        console.log('------------------------------------------------------------')
                        connection.end(); 
                        res.redirect(301, '/staff/dashboard');
                    });

                });
            });

        });
    });
}