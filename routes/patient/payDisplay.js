const express = require('express');
const patientPay = require('../../controller/patientController');

const pay = express.Router();

pay.get('/', patientPay.getPayInfo);

module.exports = pay;