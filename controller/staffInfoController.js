const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getWaitingAppointment = getWaitingAppointment;
exports.getMedicineInfoCure = getMedicineInfoCure;
function getWaitingAppointment(req, res, next){
	const staff_id = xss(req.session.staff_id);
}

function getMedicineInfoCure(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select medicine_id, medicine_name, price, description from medicine';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			medicineInfoCure = result;
			//console.log(labIncludingTestInfo);
			res.render('staff/curePatientMedicine', {
				medicineInfoCure: medicineInfoCure
			});
		})
	})
}