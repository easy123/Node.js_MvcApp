/**
 * Created by easys on 2015/6/10.
 */
var msSql = require('mssql');

var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.2.199',
    database: 'testing',
    options: {
        encrypt: false
    }
}

//var connection = new msSql.Connection(config, function (err) {
//    if(err)
//        console.log(err);
//    else
//        console.log('log');
//
//    var request = new msSql.Request(connection);
//    request.query('select * from products', function(err, recordset) {
//       if(err)
//            console.log(err);
//        else
//            console.dir(recordset);
//    });
//});

exports.query = function(sql, callback){
    var connection = new msSql.Connection(config, function (err) {
        if(err)
            console.log(err);
        else
            console.log('log');

        var request = new msSql.Request(connection);
        request.query(sql,callback);
    });
};

//exports.query('select * from products', function(err, recordset) {
//    console.log(recordset);
//});