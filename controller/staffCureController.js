const database = require('../config/databaseConfig');
const xss = require('xss');
exports.createCurePatientMedicine = createCurePatientMedicine;
exports.createCurePatientIcd = createCurePatientIcd;
exports.createCurePatientTreatment = createCurePatientTreatment;
exports.deleteCurePatient = deleteCurePatient;

//ward selection and appointment complete is also here
function deleteCurePatient(req, res, next){
    console.log("enter function deleteCurePatient");
    console.log(req.body);
    const invoice_id = xss(req.session.invoice_id);
    database.setUpDatabase(function (connection) {
		switch (req.body.switch) {
            case '1':
                const icd_id = xss(req.body.icd_id)
                var sql = 'delete from patient_icd where icd_id=? and invoice_id=?';
                connection.query(sql, [icd_id, invoice_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    console.log('--------------------------DELETE----------------------------')
                    console.log('DELETE ID:', result)
                    console.log('------------------------------------------------------------')
                    connection.end();
                    res.redirect(301, '/staff/curePatientEnsure');
                });
                break;
            case '2': 
                const treatment_id = xss(req.body.treatment_id)
                var sql = 'delete from patient_treatment where treatment_id=? and invoice_id=?';
                connection.query(sql, [treatment_id, invoice_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    console.log('--------------------------DELETE----------------------------')
                    console.log('DELETE ID:', result)
                    console.log('------------------------------------------------------------')
                    connection.end();
                    res.redirect(301, '/staff/curePatientEnsure');
                });
                break;
            case '3':
                const medicine_id = xss(req.body.medicine_id)
                var sql = 'delete from patient_medicine where medicine_id=? and invoice_id=?';
                connection.query(sql, [medicine_id, invoice_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    console.log('--------------------------DELETE----------------------------')
                    console.log('DELETE ID:', result)
                    console.log('------------------------------------------------------------')
                    connection.end();
                    res.redirect(301, '/staff/curePatientEnsure');
                });
                break;

            case '5':
                const wardneed = xss(req.body.wardneed);
                console.log(wardneed);
                var sql;
                if(wardneed == "1"){
                    sql = 'update doctor_appointment set valid="4" where appointment_id = (select appointment_id from invoice where invoice_id=?)';
                }
                else{
                    sql = 'update doctor_appointment set valid="2" where appointment_id = (select appointment_id from invoice where invoice_id=?)';
                } 
                connection.query(sql, [invoice_id], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send("SQL query error");
                        return;
                    }
                    //console.log('--------------------------UPDATE----------------------------')
                    //console.log('UPDATE ID:', result)
                    //console.log('------------------------------------------------------------')
                    sql = 'select (sum(a.times*b.price)) sum1 from patient_treatment a inner join treatment b on a.treatment_id=b.treatment_id where a.invoice_id=?';
                    connection.query(sql, [invoice_id], function (err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            res.send("SQL query error");
                            return;
                        } 
                        //console.log(result);
                        var sum1 = result[0].sum1;
                        sql = 'select (sum(a.amount*b.price)) sum2 from patient_medicine a inner join medicine b on a.medicine_id=b.medicine_id where a.invoice_id=?';
                        connection.query(sql, [invoice_id], function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                res.send("SQL query error");
                                return;
                            }
                            //console.log(result); 
                            var sum2 = result[0].sum2;
                            var sum = sum1 + sum2;
                            //console.log(sum);
                            var sql = 'update invoice set price=? where invoice_id=?';
                            connection.query(sql, [sum, invoice_id], function (err, result) {
                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    res.send("SQL query error");
                                    return;
                                }
                                //console.log('--------------------------UPDATE----------------------------')
                                //console.log('UPDATE ID:', result)
                                //console.log('------------------------------------------------------------')
                                connection.end(); 
                                res.redirect(301, '/staff/dashboard');
                            });
                        });
                    });

                });
                break;
        
        }
    }) 
}

function createCurePatientTreatment(req, res, next){
    console.log("enter function createCurePatientTreatment")
    console.log(req.body);
    //medicine_id = xss(req.body.medicine_id);
    //dose = xss(req.body.dose);
    //console.log(medicine_id);
    //console.log(dose);
    const invoice_id = xss(req.session.invoice_id);
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from invoice where invoice_id = ?';
        connection.query(sql, [invoice_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            patient_no = result[0].patient_no;
            console.log(req.body.treatment_id);
            console.log(req.body.times);
            times = req.body.times.filter(str=>{return !!str});
            console.log(times);
            var arr_patient_treatment = [];
            if(typeof(req.body.treatment_id)=="object"){
                for(var i in req.body.treatment_id){
                    console.log(i);
                    var arr=[];
                    arr.push(invoice_id);
                    arr.push(patient_no);
                    arr.push(parseInt(req.body.treatment_id[i]));
                    arr.push(parseInt(times[i]));
                    arr_patient_treatment.push(arr); 
                }
            }
            else{
                var arr=[];
                arr.push(invoice_id);
                arr.push(patient_no);
                arr.push(parseInt(req.body.treatment_id));
                arr.push(parseInt(times[0]));
                arr_patient_treatment.push(arr);  
            }
            console.log(arr_patient_treatment);
            sql = 'insert into patient_treatment (invoice_id, patient_no, treatment_id, times) values ?';
            connection.query(sql, [arr_patient_treatment], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end();
                res.redirect(301, '/staff/curePatientTreatment');
            });
        });
    });
    
}


function createCurePatientIcd(req, res, next){
    console.log("enter function createCurePatientICD");
    console.log(req.body);
    console.log(req.session);
    const invoice_id = xss(req.session.invoice_id);
    //console.log(invoice_id);
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from invoice where invoice_id = ?';
        connection.query(sql, [invoice_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            patient_no = result[0].patient_no;
            console.log(req.body.icd_id);
            var arr_patient_icd = [];
            if(typeof(req.body.icd_id)=="object"){
                for(var i in req.body.icd_id){
                    console.log(i);
                    var arr=[];
                    arr.push(invoice_id); 
                    arr.push(patient_no);
                    arr.push(parseInt(req.body.icd_id[i]));
                    arr_patient_icd.push(arr); 
                }
            }
            else{
                var arr=[];
                arr.push(invoice_id); 
                arr.push(patient_no);
                arr.push(parseInt(req.body.icd_id));
                arr_patient_icd.push(arr); 
            }
            console.log(arr_patient_icd);
            sql = 'insert into patient_icd (invoice_id, patient_no, icd_id) values ?';
            connection.query(sql, [arr_patient_icd], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end();
                res.redirect(301, '/staff/curePatientIcd');
            });
        });
    });
}

function createCurePatientMedicine(req, res, next){
    console.log("enter function createCurePatientMedicine")
    console.log(req.body);
    //medicine_id = xss(req.body.medicine_id);
    //dose = xss(req.body.dose);
    //console.log(medicine_id);
    //console.log(dose);
    const invoice_id = xss(req.session.invoice_id);
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from invoice where invoice_id = ?';
        connection.query(sql, [invoice_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error"); 
                return;
            }
            patient_no = result[0].patient_no;
            console.log(req.body.medicine_id);
            console.log(req.body.dose);
            //console.log(typeof(req.body.medicine_id)=="object");
            dose = req.body.dose.filter(str=>{return !!str});
            console.log(dose);
            var arr_patient_medicine = [];
            if(typeof(req.body.medicine_id)=="object"){
                for(var i in req.body.medicine_id){
                    console.log(i);
                    var arr=[];
                    arr.push(invoice_id);
                    arr.push(patient_no);
                    arr.push(parseInt(req.body.medicine_id[i]));
                    arr.push(parseInt(dose[i]));
                    arr_patient_medicine.push(arr); 
                }
            }
            else{
                var arr=[];
                arr.push(invoice_id);
                arr.push(patient_no);
                arr.push(parseInt(req.body.medicine_id));
                arr.push(parseInt(dose[0]));
                arr_patient_medicine.push(arr); 
            }
            console.log(arr_patient_medicine);
            sql = 'insert into patient_medicine (invoice_id, patient_no, medicine_id, amount) values ?';
            connection.query(sql, [arr_patient_medicine], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                connection.end();
                res.redirect(301, '/staff/curePatientMedicine');
            });
        });
    });
    
}

