var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


conn = db_connect.getConnection();

let name = 'example_name';
let price = 100;
let imganme = 'example_imganme';

let values = [name,price,imganme];

conn.query(db_sql.item_insert, values, (e, result, fields) => {
    if(e){
        console.log('Insert Error');
        console.log(e);
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});