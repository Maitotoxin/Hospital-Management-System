const database = require('../config/databaseConfig');
const xss = require('xss');
exports.updateAppointmentValid = updateAppointmentValid;

function updateAppointmentValid(req, res, next){
    console.log(req.body);
    const staff_id = xss(req.session.staff_id);
    database.setUpDatabase(function (connection) {
		var sql = 'select staff_no from staff where staff_id = ?'
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send("SQL query error");
                return;
            }
            staff = result[0];
        })
    })
}

