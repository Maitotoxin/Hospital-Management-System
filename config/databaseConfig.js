var mysql = require('mysql')

exports.setUpDatabase = setUpDatabase;
exports.setUpDeveloper = setUpDeveloper;
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

function setUpDeveloper(callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'dws1',
        password: 'dws',
        port: '1521',
        database: 'DWS_ORCL'
    })
    callback(connection)
}
