const database = require('../../config/databaseConfig');
const xss = require('xss');
exports.createPatientInvoice = createPatientInvoice;


function createPatientInvoice(req, res, next){
    console.log("createPatientInvoice");
    const appointment_id = xss(req.body.appointment_id);
    const patient_no = xss(req.body.patient_no);
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
			    res.render('patient/doctorListAppointment', {
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
                    appointment = result;
                    sql = 'select addtime(?, "14 0:0:0")';
                    connection.query(sql, [appointment.appointment_time], function (err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            res.send("SQL query error");
                            return;
                        }
                        due_date = result;
                        console.log(due_date);
                        sql = 'insert into invoice (patient_no, price_paid, appointment_id, type, due_date) value ?'
                        var sqlParams = [patient_no, 0, appointment_id, "D", due_date];
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
