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
    const first_name = xss(req.body.first_name);
    const last_name = xss(req.body.last_name);
    const state = xss(req.body.state);
    const city = xss(req.body.city);
    const st_address = xss(req.body.st_address);
    const zipcode = xss(req.body.zipcode);
    const gender = xss(req.body.gender);
    const birthdate = xss(req.body.birthdate);
    const phone = xss(req.body.phone);

    //verify
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();

        var password = bcrypt.hashSync(plainTextPassword, saltRound);
        var addSqlParams = [password, first_name, last_name, state, city, st_address, zipcode, gender, birthdate, phone, "0"];
        //console.log(addSqlParams);
        var addSql = 'insert into patient (password, first_name, last_name, state, city, st_address, zipcode, gender, birthdate, phone, patient_class) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
}