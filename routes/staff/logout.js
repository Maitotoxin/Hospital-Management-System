const express = require('express');
const staffController = require('../../controller/staffController')

const logout = express.Router();

logout.get('/',staffController.logoutStaff);

module.exports = logout;