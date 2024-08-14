var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'example_id';

console.log("SQL Query:", db_sql.item_delete);

// 데이터베이스 쿼리 실행
conn.query(db_sql.item_delete, [id], (err, result) => {
    if (err) {
        console.log('Delete Error');
        console.log('Error Message: ' + err);
    } else {
        console.log('Delete Success');
        console.log('Deleted Rows: ' + result.affectedRows);
    }
    db_connect.close(conn);
});
