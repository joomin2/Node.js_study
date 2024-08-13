var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


conn = db_connect.getConnection();
//db_connect안에 있는getConnection()메서드(함수) 사용
let userid = 'id01';
let itemid= '10';
let itemname = '바지4';
let itemprice = '50000';
let count = 1;
let totalprice = itemprice*count;  


let values = [userid,itemid,itemname,itemprice,count,totalprice];
//db_sql.cart_insert, values 이걸 집어넣으면 (e, result, fields) 이CD것이 실행 )  
conn.query(db_sql.cart_insert, values, (e, result, fields) => {
    if(e){
        console.log('Insert Error');
        console.log(e);
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});