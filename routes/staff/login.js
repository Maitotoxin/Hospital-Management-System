const express = require('express');
const staffController = require('../../controller/staffController')

const login = express.Router();

login.get('/',(req, res) =>{
    res.render('staff/login');
});

login.post('/', staffController.loginStaff);

module.exports = login;