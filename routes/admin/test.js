const express = require('express');
const test = require('../../controller/developerController')
const db = require('../../config/databaseConfig');
const fortest = express.Router();


//fortest.get('/',test.test);
fortest.get('/', function(req, res) {
    db.getConnected("SELECT * FROM TABLE3", [], function(data){ //callback
       if (data){
           console.log("aaa");
            console.log(data);
            return res.render('admin/hospitalAnalysis', {
                data: data
        });
       }
    });
 });

module.exports = fortest;