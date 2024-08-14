// 필요한 모듈 불러오기
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

// 데이터베이스 연결
conn = db_connect.getConnection();

// 삭제할 고객의 ID 설정
let id = 'example_id';

// SQL 구문이 제대로 로드되었는지 확인
//console.log("SQL Query:", db_sql.cust_delete);  

conn.query(db_sql.cust_delete, [id], (err, result) => {
    if (err) {
        console.log('Delete Error');
        console.log('Error Message: ' + err);
    } else {
        console.log('Delete Success');
        console.log('Deleted Rows: ' + result.affectedRows);
    }
    // 연결 닫기
    db_connect.close(conn);
});
