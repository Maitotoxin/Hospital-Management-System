const developer = require('../config/databaseConfig');
const database = require('../config/databaseConfig');
const xss = require('xss');
exports.icdAnalysis = icdAnalysis;
exports.medicineAnalysis = medicineAnalysis;
exports.treatmentAnalysis=treatmentAnalysis;
exports.wardRateAnalysis =wardRateAnalysis;
exports.hospitalExpenseAnalysis = hospitalExpenseAnalysis;

function hospitalExpenseAnalysis(req, res, next){
    var sql ='select disease_name, avg(price) total_expense from doctor_appointment_icd group by disease_name';
    console.log("enter test");
    developer.getConnected(sql, [medicine_id], function (result) {
        testInfo = result;
        console.log(testInfo);
        //console.log("adadda");
        //console.log(labIncludingTestInfo);
        res.render('admin/icdExpenseAnalysis', {
            testInfo: JSON.stringify(testInfo),
        });
    });
}


function hospitalExpenseAnalysis(req, res, next){
    var sql ='select hospital_name, sum(price) total_expense from doctor_appointment_medicine group by hospital_name';
    console.log("enter test");
    developer.getConnected(sql, [medicine_id], function (result) {
        testInfo = result;
        console.log(testInfo);
        //console.log("adadda");
        //console.log(labIncludingTestInfo);
        res.render('admin/hospitalExpenseAnalysis', {
            testInfo: JSON.stringify(testInfo),
        });

    });
}

function wardRateAnalysis(req, res, next){
    const hospital_id = xss(req.body.hospital_id);
    var arr = [];
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = "select count(*)amount from ward where hospital_id=? and status='0'";
        connection.query(sql, [hospital_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            console.log(result);
            arr.push(result[0].amount);
            sql = "select count(*)amount from ward where hospital_id=? and status='1'";
            connection.query(sql, [hospital_id], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                console.log(result);
                arr.push(result[0].amount); 
                console.log(arr);
                sql = 'select hospital_id, hospital_name from hospital';
		        connection.query(sql, [], function (err, result) {
			        if (err) {
				        console.log('[SELECT ERROR] - ', err.message);
				        res.send('SQL query error');
				        return;
                    }
                    hospitalInfo = result;
                    res.render('admin/wardRateAnalysis', {
                        hospitalInfo: hospitalInfo,
                        arr: JSON.stringify(arr),
                    });
                });
            });
        });
    });
}

function medicineAnalysis(req, res, next) {
    const medicine_id = xss(req.body.medicine_id);
    console.log(medicine_id);
    var sql ='select hospital_name, count(*) medicine_num from doctor_appointment_medicine where medicine_id=:1 group by hospital_name';
    console.log("enter test");
    developer.getConnected(sql, [medicine_id], function (result) {
            testInfo = result;
            console.log(testInfo);
            //console.log("adadda");
            database.setUpDatabase(function (connection) {
                connection.connect(); 
                var sql = 'select medicine_id, medicine_name from medicine';
                connection.query(sql, [], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send('SQL query error');
                        return;
                    }
                    medicineInfo = result;
                    //console.log(labIncludingTestInfo);
                    res.render('admin/hospitalMedicineAnalysis', {
                        medicineInfo: medicineInfo,
                        testInfo: JSON.stringify(testInfo),
                    });
                })
            })

    });
}

function treatmentAnalysis(req, res, next) {
    const icd_id = xss(req.body.treatment_id);
    console.log(treatment_id);
    var sql ='select hospital_name, count(*) treatment_num from doctor_appointment_treatment where treatment_id=:1 group by hospital_name';
    console.log("enter test");
    developer.getConnected(sql, [treatment_id], function (result) {
            testInfo = result;
            console.log(testInfo);
            //console.log("adadda");
            database.setUpDatabase(function (connection) {
                connection.connect(); 
                var sql = 'select treatment_id, treatment_name from treatment';
                connection.query(sql, [], function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send('SQL query error');
                        return;
                    }
                    treatmentInfo = result;
                    //console.log(labIncludingTestInfo);
                    res.render('admin/hospitalTreatmentAnalysis', {
                        treatmentInfo: treatmentInfo,
                        treatmentInfo: JSON.stringify(treatmentInfo),
                    });
                })
            })

    });
}

function icdAnalysis(req, res, next) {
    const icd_id = xss(req.body.icd_id);
    console.log(icd_id);
    var sql ='select hospital_name, count(*) icd_num from doctor_appointment_icd where icd_id=:1 group by hospital_name';
    console.log("enter test");
    developer.getConnected(sql, [icd_id], function (result) {
            testInfo = result;
            console.log(testInfo);
            //console.log("adadda");
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
                    //console.log(labIncludingTestInfo);
                    res.render('admin/hospitalIcdAnalysis', {
                        icdInfo: icdInfo,
                        testInfo: JSON.stringify(testInfo),
                    });
                })
            })

    });
}


