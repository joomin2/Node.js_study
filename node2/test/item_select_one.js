var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'example_id';

conn.query(db_sql.item_select_one, id, (err, result, fields) => {

    if(err){
        console.log('Select Error');
        console.log('Error Message:')+e;
    }else{
        console.log(result);
        console.log(JSON.stringify(result));
    }

    db_connect.close(conn);

});