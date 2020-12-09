const express = require('express');
const patientPay = require('../../controller/patientInfoController');

const pay = express.Router();

pay.get('/',(req, res) =>{
    res.render('patient/invoicePay');
});
pay.post('/', patientPay.invoicePay);
module.exports = pay;