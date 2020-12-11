const database = require('../config/databaseConfig');
const xss = require('xss');
exports.updateAppointmentValid = updateAppointmentValid;

function updateAppointmentValid(req, res, next){
    console.log(req.body);
    const staff_id = xss(req.session.staff_id);
    const valid = xss(req.body.valid);
    const appointment_id = xss(req.body.appointment_id);
    database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            staff = result[0];
            sql = 'update doctor_appointment set valid=? where appointment_id=?';
            connection.query(sql, [valid, appointment_id], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send("SQL query error");
                    return;
                }
                console.log('--------------------------Update----------------------------')
                console.log(result)
                console.log('------------------------------------------------------------')
                //issue 01: 注册成功alert
                connection.end();
                res.redirect(301, '/staff/manageAppointment');
            })
        })
    })
}

