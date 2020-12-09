const express = require('express');
const staffController = require('../../controller/staffController')

const register = express.Router();

register.get('/',(req, res) =>{
    res.render('staff/register');
});

register.post('/', staffController.createStaff);

module.exports = register;