const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getIcdInfo = getIcdInfo;
exports.getTreatmentInfo = getTreatmentInfo;
exports.getMedicineInfo = getMedicineInfo;
exports.getHospitalInfo =getHospitalInfo;

function getIcdInfo(req, res, next){
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
			res.render('admin/hospitalIcdAnalysis', {
				icdInfo: icdInfo
			});
		})
	})
}

function getTreatmentInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select treatment_id, treatment_name, description, price from treatment';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			treatmentInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('admin/hospitalTreatmentAnalysis', {
				treatmentInfo: treatmentInfo
			});
		})
	})
}

function getMedicineInfo(req, res, next){
	const staff_id = xss(req.session.staff_id);
	database.setUpDatabase(function (connection) {
		connection.connect(); 
		var sql = 'select medicine_id, medicine_name, dose, price, description from medicine';
		connection.query(sql, [staff_id], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			medicineInfo = result;
			//console.log(labIncludingTestInfo);
			res.render('admin/hospitalMedicineAnalysis', {
				medicineInfo: medicineInfo
			});
		})
	})
}

function getHospitalInfo(req, res, next) {
	database.setUpDatabase(function (connection) {
		connection.connect();
		var sql = 'select hospital_id, hospital_name from hospital';
		connection.query(sql, [], function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
			}
			hospitalInfo = result;
			//console.log(userInfo);
			res.render('admin/wardRateAnalysis', {
				hospitalInfo: hospitalInfo
			});
		});
	});
} 
