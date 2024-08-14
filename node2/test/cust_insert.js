var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


conn = db_connect.getConnection();

let id = 'example_id';
let pwd = 'example_pw';
let name = 'example_name';
let acc = 'example_acc';

let values = [id, pwd, name, acc];

conn.query(db_sql.cust_insert, values, (e, result, fields) => {
    if (e) {
        console.log('Insert Error');
        console.log(e);
    } else {
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});