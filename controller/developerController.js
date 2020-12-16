const developer = require('../config/databaseConfig');
const database = require('../config/databaseConfig');
const xss = require('xss');
var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
exports.test = test;
exports.getAdmins = getAdmins;

function test(req, res, next) {
    var sql ='SELECT * FROM TABLE3';
    console.log("enter test");
    developer.getConnected(sql, [], function (result) {
            testInfo = result;
            console.log(testInfo);
            console.log("adadda");
            return res.render('admin/hospitalAnalysis', {
				testInfo: JSON.stringify(testInfo),
			});

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
