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
    const patient_id = xss(req.session.patient_id);
    const appointment_time = xss(req.body.appointment_time);
    const test_id = xss(parseInt(req.body.test_id));
    
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
            console.log("aaaaa");
            patient_no = result[0].patient_no;
            console.log(patient_no);
            sql = 'select price from test where test_id = ?';
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
            connection.query(sql, [test_id], function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                } 
                console.log("aaaaa");
                price = result[0].price;
                sql = 'insert into test_appointment (patient_no, lab_id, test_id, appointment_time, valid) values (?, ?, ?, ?, ?)';
                var sqlParams = [patient_no, lab_id, test_id, appointment_time, "0"];
                connection.query(sql, sqlParams, function (err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message)
                        res.send("SQL insert error");
                        return;
                    } 
                    console.log("aaaaa");
                    sql = 'select a.invoice_id, a.lab_appointment_id from invoice a inner join test_appointment b on a.lab_appointment_id = b.appointment_id'
                    connection.query(sql, [test_id], function (err, result){
                        if (err) {
                            console.log('[INSERT ERROR] - ', err.message)
                            res.send("SQL insert error");
                            return;
                        }
                        console.log("aaaaa");
                        fuck_dead_lock = result[0];
                        console.log(fuck_dead_lock);
                        sql = 'update test_appointment set invoice_id = ? where appointment_id = ?';
                        sqlParams = [fuck_dead_lock.invoice_id, fuck_dead_lock.lab_appointment_id];
                        connection.query(sql, sqlParams, function (err, result){
                            if (err) {
                                console.log('[INSERT ERROR] - ', err.message)
                                res.send("SQL insert error");
                                return;
                            }
                            sql = 'update invoice set price=?, price_paid=0, due_date=? where invoice_id = ?';
                            sqlParams = [price, appointment_time, fuck_dead_lock.invoice_id];
                            connection.query(sql, sqlParams, function (err, result){
                                if (err) {
                                    console.log('[INSERT ERROR] - ', err.message)
                                    res.send("SQL insert error");
                                    return;
                                }
                                console.log("aaaaa");
                                console.log('--------------------------INSERT----------------------------')
                                console.log('INSERT ID:', result)
                                console.log('------------------------------------------------------------')
                                connection.end(); 
                                res.redirect(301, '/patient/dashboard');
                            })

                        })
                    })
                })
            })  
        })
    })
}
