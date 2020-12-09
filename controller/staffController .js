const database = require('../config/databaseConfig');
const bcrypt = require('bcrypt');
const saltRound = 10;
const xss = require('xss');

exports.createStaff = createStaff;
exports.logoutStaff = logoutStaff;
exports.loginStaff = loginStaff;
exports.updateStaffProfile = updateStaffProfile;


/*
function createPatientInvoice(req, res, next) {
    const patient_id = xss(req.body.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select patient_no from patient where patient_id = ?';
		connection.query(sql, patient_id, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            } 
            patient_no = result[0].patient_no;
            sql = "select "
		});
	});
}
*/



function createStaff(req, res, next) {
    console.log('enter function createStaff');
    console.log(req.body);
    const staff_id = xss(req.body.staff_id);
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
    const description = xss(req.body.description);
    const staff_class = xss(req.body.staff_class);
    //verify
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select * from staff where staff_id = ?';
        connection.query(sql, [staff_id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if (result.length > 0) {
                console.log('Already exists staff id', id);
                res.send("Staff already exists");
                return;
            }
            var password = bcrypt.hashSync(plainTextPassword, saltRound);
            var addSqlParams = [staff_id, password, first_name, last_name, description,state, city, st_address, zipcode, gender, birthdate, phone, staff_class];
            //console.log(addSqlParams);
            var addSql = 'insert into staff (staff_id, password, first_name, last_name, description, state, city, st_address, zipcode, gender, birthdate, phone, staff_class) values (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)';
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
                connection.end();
                res.redirect(301, '/staff/login');
            })
        })
    })
}

function logoutStaff(req, res, next) {
    req.session.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('/staff/login');
    });
}

function loginStaff(req, res, next) {
    const id = xss(req.body.staff_id);
    const plainTextPassword = xss(req.body.password);
    //verify
    if (id.trim().length == 0) {
        return res.status(400).send('<h4>staff id error</h4>');
    }
    if (plainTextPassword.trim().length == 0) {
        return res.status(400).send('<h4>password error</h4>');
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var sql = 'select password from staff where staff_id = ?';
        connection.query(sql, [id], function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            if (result.length == 0) {
                console.log('no such staff, please register');
                res.send("no such staff");
                return;
            }
            const staff = result[0]
            bcrypt.compare(plainTextPassword, staff.password, function (err, success) {
                if (err) {
                    console.log('BCRYPT COMPARE ERROR');
                    res.send('BCRYPT COMPARE ERROR');
                    return;
                }
                if (!success) {
                    console.log('password error');
                    res.send('password error');
                    return;
                }
                connection.end();
                req.session.pstaff_id = id;
                req.app.locals.staff_id = id;
                res.redirect(301, '/staff/dashboard');
            });

        })
    })
}

function updateStaffProfile(req, res, next) {
    console.log('req.body');
    const staff_id = xss(req.session.staff_id);
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
    const description = xss(req.body.description);
    const staff_class = xss(req.body.staff_class);
    if (plainTextPassword != plainTextPasswordAgain) {
        console.log('Passwords are not the same');
        res.send("Passwords are not the same");
        return;
    }
    database.setUpDatabase(function (connection) {
        connection.connect();
        var password = bcrypt.hashSync(plainTextPassword, saltRound);
        var sql = 'update staff set password = ?, first_name = ?, last_name = ?, description=?,state = ?, city = ?, st_address = ?, zipcode = ?, gender = ?, birthdate = ?, phone = ?, staff_class=? where staff_id = ?';
        var sqlParams = [password, first_name, last_name, description,state, city, st_address, zipcode, gender, birthdate, phone, staff_class,staff_id];
        connection.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message)
                res.send("SQL update error");
                return; 
            }
            console.log('--------------------------INSERT----------------------------')
            console.log('INSERT ID:', result)
            console.log('------------------------------------------------------------')
            //issue 01: 注册成功alert
            connection.end();
            res.redirect(301, '/staff/dashboard');
        })
    })
}