const database = require('../config/databaseConfig');
const xss = require('xss');
exports.updateAppointmentValid = updateAppointmentValid;
function updateAppointmentValid(req, res, next){
     console.log(req.body);
}

