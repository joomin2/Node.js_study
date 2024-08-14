var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();
let id = 'example_id';
let name = 'example_name';
let price = 100;
let imgname = 'example_imgname';

let values = [name,price,imgname,id];

conn.query(db_sql.item_update, values, (e, result, fields) => {
    if(e){
        console.log('Update Error');
        console.log(e);
    }else{
        console.log('Update OK !');
    }
    db_connect.close(conn);
});