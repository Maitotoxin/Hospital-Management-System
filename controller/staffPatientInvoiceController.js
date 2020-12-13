const database = require('../config/databaseConfig');
const xss = require('xss');
exports.createPatientInvoiceAndIcd = createPatientInvoiceAndIcd;


function createPatientInvoiceAndIcd(req, res, next){
    console.log("createPatientInvoice");
    console.log("check session");
    //console.log(req.session);
    const appointment_id = xss(parseInt(req.cookies["appointment_id"]));
    const patient_no = xss(parseInt(req.cookies["patient_no"]));
    //console.log(appointment_id);
    //console.log(patient_no);
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select icd_id, disease_name from icd';
		connection.query(sql, [], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
            icdInfo = result;
            sql = 'select a.last_update, a.icd_id, b.disease_name from patient_icd a inner join icd b on a.icd_id=b.icd_id where a.patient_no=?'
		    connection.query(sql, [patient_no], function (err, result) {
			    if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
			    }
                patientIcdRecordInfo = result;
                sql = 'select invoice_id from invoice where appointment_id = ? and type = "D"';
                connection.query(sql, [appointment_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    if (result.length > 0) {
                        console.log('Already exists invoice with doctor appointment_id', appointment_id);
                        invoiceInfo = result;
                        //console.log(invoiceInfo);
                        connection.end();
                        console.log(invoiceInfo[0].invoice_id);
                        req.session.invoice_id = invoiceInfo[0].invoice_id;
                        req.app.locals.invoice_id = invoiceInfo[0].invoice_id;
                        //console.log(req.session);
			            res.render('staff/curePatientIcd', {
                            invoiceInfo: invoiceInfo,
                            icdInfo:icdInfo,
                            patientIcdRecordInfo:patientIcdRecordInfo
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
                                        console.log(invoiceInfo[0].invoice_id);
                                        req.session.invoice_id = invoiceInfo[0].invoice_id;
                                        req.app.locals.invoice_id = invoiceInfo[0].invoice_id;
                                        res.render('staff/curePatientIcd', {
                                            invoiceInfo: invoiceInfo,
                                            icdInfo:icdInfo,
                                            patientIcdRecordInfo:patientIcdRecordInfo
                                        });
                                    });
                                });
                            });
                    
                        });
                    }

                });
            });
        });
        
    });
}
