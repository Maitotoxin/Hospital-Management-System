const database = require('../config/databaseConfig');
const bcrypt = require('bcrypt');
const saltRound = 10;
const xss = require('xss');

exports.createPatient = createPatient;

function createPatient(req, res, next) {
    console.log('enter function createPatient');
    console.log(req.body);
    const plainTextPassword = xss(req.body.password1);
    const plainTextPasswordAgain = xss(req.body.password2);
    const fname = xss(req.body.fname);
    const lname = xss(req.body.lname);
    const state = xss(req.body.state);
    const city = xss(req.body.city);
    const street = xss(req.body.street);
    const zipcode = xss(req.body.zipcode);
    const gender = xss(req.body.gender);
    const maritalstatus = xss(req.body.maritalstatus);
    //verify
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from user where userid = ?';
        connection.query(sql, [id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if (result.length > 0) {
                console.log('Already exists user id', id);
                res.send("User already exists");
                return;
            }
            var password = bcrypt.hashSync(plainTextPassword, saltRound);
            if (gender == 'NULL') {
                var addSqlParams = [id, password, fname, lname, state, city, street, zipcode, maritalstatus];
                //console.log(addSqlParams);
                var addSql = 'insert into user (userid, password, fname, lname, state, city, street, zipcode,  maritalstatus) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            } else {
                var addSqlParams = [id, password, fname, lname, state, city, street, zipcode, gender, maritalstatus];
                //console.log(addSqlParams);
                var addSql = 'insert into user (userid, password, fname, lname, state, city, street, zipcode, gender, maritalstatus) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            }
            //var addSql = 'insert into user (userid, password) values (?, ?)';
            //var addSqlParams = [id, password];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                    res.send("SQL insert error");
                    return;
                }
                console.log('--------------------------INSERT----------------------------')
                console.log('INSERT ID:', result)
                console.log('------------------------------------------------------------')
                //issue 01: 注册成功alert
                connection.end();
                res.redirect(301, '/login');
            })
        })
    })
}