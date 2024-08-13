var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
conn = db_connect.getConnection();

//db_connect(~의) getConnection
conn.query(db_sql.cust_select, function (err, result, fields) {
    if(err){
        console.log('Select Error');
        console.log('Error Message:')+err;
    }else{
        console.log(result);
        console.log(JSON.stringify(result));
    }
    db_connect.close(conn);
});