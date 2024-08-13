var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


conn = db_connect.getConnection();
//db_connect안에 있는getConnection()메서드(함수) 사용
let id = 'id06';
let pwd = 'pwd04';
let name = '도라에몽';
let acc = '1135';

let values = [id,pwd,name,acc];
//db_sql.cust_insert, values 이걸 집어넣으면 (e, result, fields) 이것이 실행 )  
conn.query(db_sql.cust_insert, values, (e, result, fields) => {
    if(e){
        console.log('Insert Error');
        console.log(e);
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});