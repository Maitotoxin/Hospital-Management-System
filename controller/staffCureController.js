const database = require('../config/databaseConfig');
const xss = require('xss');
exports.createCurePatientMedicine = createCurePatientMedicine;
exports.createCurePatientIcd = createCurePatientIcd;
exports.createCurePatientTreatment = createCurePatientTreatment;
exports.deleteCurePatient = deleteCurePatient;

function deleteCurePatient(req, res, next){
    
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
            for(var i in req.body.treatment_id){
                console.log(i);
                var arr=[];
                arr.push(invoice_id);
                arr.push(patient_no);
                arr.push(parseInt(req.body.treatment_id[i]));
                arr.push(parseInt(times[i]));
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
            for(var i in req.body.icd_id){
                console.log(i);
                var arr=[];
                arr.push(invoice_id); 
                arr.push(patient_no);
                arr.push(parseInt(req.body.icd_id[i]));
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
            dose = req.body.dose.filter(str=>{return !!str});
            console.log(dose);
            var arr_patient_medicine = [];
            for(var i in req.body.medicine_id){
                console.log(i);
                var arr=[];
                arr.push(invoice_id);
                arr.push(patient_no);
                arr.push(parseInt(req.body.medicine_id[i]));
                arr.push(parseInt(dose[i]));
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

