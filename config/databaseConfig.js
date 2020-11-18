var mysql = require('mysql')

exports.setUpDatabase = setUpDatabase

const env = 'dev'

const hostName = 'localhost'
const user = 'root'
const password = '1234'
const port = '3307'
const databaseName = 'HMS'

function setUpDatabase(callback) {
    var connection = mysql.createConnection({
        host: hostName,
        user: user,
        password: password,
        port: port,
        database: databaseName
    })
    callback(connection)
}
