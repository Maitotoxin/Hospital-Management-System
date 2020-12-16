var mysql = require('mysql')
var oracledb = require('oracledb');
exports.setUpDatabase = setUpDatabase;
//exports.getConnected = getConnected;
exports.doRelease = doRelease;
exports.getConnected = getConnected;
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

function getConnected(sql, params, callback) {
    oracledb.getConnection(
    {
        user:'dws1',　　//用户名
        password:'dws',　　//密码
        //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
        connectString : "localhost:1521/ORCL"
    },
    function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(null); 
            return;
        }
        connection.execute(
            sql, params,

            function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    callback(null);
                    return;
                }
                console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
                console.log(result.rows);     // [ [ 180, 'Construction' ] ]
                //module.exports.rows  = result.rows;
                rows = result.rows;
                doRelease(connection);
                callback(result); 
                //console.log("aaa");
                return;
            });
    });
};

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message); 
      }
    });
}
