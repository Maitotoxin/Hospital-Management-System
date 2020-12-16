const developer = require('../config/databaseConfig');
const xss = require('xss');
var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
exports.test = test;

function test(req, res, next) {
    var sql ='SELECT * FROM TABLE3';
    console.log("enter test");
    developer.getConnected(sql, [], function (err, result) {

            testInfo = result;
            console.log(result);
            return res.render('admin/hospitalAnalysis', {
				testInfo: testInfo
			});

    });
}