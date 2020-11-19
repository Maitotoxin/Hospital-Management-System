const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');

exports.getPatinetInfo = getPatinetInfo;

function getPatinetInfo(req, res, next) {
	const patient_id = xss(req.session.patient_id);
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select patient_id, first_name, last_name, st_address, city, state, zipcode, phone, birthdate, gender, patient_class from patient where userid = ?';
		connection.query(sql, [patient_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			if (result.length == 0) {
				console.log('no such patient');
				res.render('error', 
					'no such patient'
				);
				return;
			}
			patientInfo = result[0];
			common.correctUserInfo(userInfo);
			//console.log(userInfo);
			res.render('patient/dashboard', {
				patientInfo: patientInfo
			});
		});
	});
}