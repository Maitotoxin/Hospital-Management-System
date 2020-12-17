const developer = require('../config/databaseConfig');
const database = require('../config/databaseConfig');
const xss = require('xss');
var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
exports.icdAnalysis = icdAnalysis;
exports.getAdmins = getAdmins;
   
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
                    res.render('admin/hospitalAnalysis', {
                        icdInfo: icdInfo,
                        testInfo: JSON.stringify(testInfo),
                    });
                })
            })

    });
}

function getAdmins(req, res, next) {
    database.setUpDatabase(function(connection) {
        connection.connect();
        var sql = 'select adminid from admin';
        connection.query(sql, [], function(err, result) {
            if(err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send('SQL query error');
                return;
            }
            console.log(result);
            if(result.length == 0) {
                console.log('no admin currently');
                res.send('no such admin currently');
                return;
            }
            res.render('admin/hospitalAnalysis', {
                users: result
            });
        });
    });
}
