const database = require('../config/databaseConfig');
const xss = require('xss');
exports.payInvoice = payInvoice;

function payInvoice(req, res, next){
    console.log(req.body);
	const patient_id = xss(req.session.patient_id);
	const payment_method = xss(req.body.payment_method);
	const invoice_id = xss(req.body.invoice_id);
    const paymentAmount = xss(req.body.amount);
    database.setUpDatabase(function (connection) {
		connection.connect();
        var amountsql = 'select (price-price_paid)leftamount from invoice where invoice.invoice_id = ?';
        connection.query(amountsql, [invoice_id], function (err, result) {
            if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				res.send('SQL query error');
				return;
            }
            var leftamount = result[0].leftamount;
            if (paymentAmount > leftamount) {
				console.log('pay too much');
				res.send('payment amount is greater than remaining amount');
				return;
            }
            else{
                var sql = 'insert into receipt (invoice_id, patient_id, amount, payment_method) values (?,?,?,?)';
                connection.query(sql, [invoice_id, patient_id, paymentAmount, payment_method], function (err, result) {
                    if (err) {
						console.log('[SELECT ERROR] - ', err.message);
						res.send('SQL query error');
						return;
                    }
                    console.log('--------------------------INSERT----------------------------')
                    console.log('INSERT ID:', result)
                    console.log('------------------------------------------------------------')
                    sql = 'update invoice set price_paid = price_paid + ? where invoice_id=?';
                    connection.query(sql, [paymentAmount, invoice_id], function (err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            res.send('SQL query error');
                            return;
                        }
                        console.log('payment success');
                        connection.end();
                        res.redirect(301, '/patient/dashboard');
                    })
                })
            }
        })
    })
}