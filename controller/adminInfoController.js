const database = require('../config/databaseConfig');
const common = require('./util/common');
const xss = require('xss');
exports.getIcdInfo = getIcdInfo;

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
			res.render('admin/hospitalAnalysis', {
				icdInfo: icdInfo
			});
		})
	})
}