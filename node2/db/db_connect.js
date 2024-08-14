const mysql = require('mysql2');
// 데이터베이스 연결에 필요한 설정값(예: 호스트, 포트, 사용자, 비밀번호, 데이터베이스 이름)을 포함하는 객체를 반환
const config = require('./db_config');

module.exports = {
  //익명함수 
  getConnection:function(){
    return mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database
    });
  },
  close:function(conn){
    console.log('Close..');
    conn.end();
  }

}
