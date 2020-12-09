const express = require('express');
const staffController = require('../../controller/staffController')

const updateStaffInfo = express.Router();

updateStaffInfo.get('/',(req, res) =>{
    res.render('staff/profileUpdate');
});

updateStaffInfo.post('/', staffController.updateStaffProfile);

module.exports = updateStaffInfo;