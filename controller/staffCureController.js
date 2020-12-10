const database = require('../config/databaseConfig');
const xss = require('xss');
exports.createCurePatientMedicine = createCurePatientMedicine
function createCurePatientMedicine(req, res, next){
    console.log("enter function createCurePatientMedicine")
    console.log(req.body);
    //medicine_id = xss(req.body.medicine_id);
    //dose = xss(req.body.dose);
    //console.log(medicine_id);
    //console.log(dose);
    console.log(req.body.medicine_id);
    console.log(req.body.dose);
    dose = req.body.dose.filter(str=>{return !!str});
    console.log(req.body.dose);
    var arr_medicine_id_dose = [];
    for(var i in req.body.medicine_id){
        console.log(i);
        var arr=[];
        arr.push(parseInt(req.body.medicine_id[i]));
        arr.push(parseInt(dose[i]));
        arr_medicine_id_dose.push(arr);
    }
    console.log(arr_medicine_id_dose);
} 
