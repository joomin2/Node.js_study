// 이 라인은 .env 파일에 정의된 환경 변수를 로드합니다. .env 파일은 프로젝트의 루트 디렉토리에 위치
require('dotenv').config();
// .env 파일에 정의된 키-값 쌍이 process.env 객체에 추가
module.exports = (function() {
    return{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    }
})();