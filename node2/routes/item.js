const express = require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks'); //html파씽
const bodyParser = require('body-parser');

// Multer 사용
const multer = require('multer')
const limits = {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
}
// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img') // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //파일 이름 설정
    }
})
const upload = multer({
    storage: storage
})



// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

// My Util
var goto = require('../util/goto');

// /block
router
    .get('/', (req, res) => {
        goto.go(req, res, { 'centerpage': 'item/center' });
    })
    .get('/item1', (req, res) => {
        conn = db_connect.getConnection();


        conn.query(db_sql.item_select, function (err, result, fields) {
            try {
                if (err) {
                    console.log('Select Error');
                    throw e;

                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'item/item1', 'items': result })
                }
            } catch {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }

        });

    })
    .get('/item2', (req, res) => {
        goto.go(req, res, { 'centerpage': 'item/item2' });
    })
    .post('/updateimpl', upload.single('img'), (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let price = req.body.price;
        let oldname = req.body.oldname;
    
        // 초기 values 배열 설정
        let values = [name, price, oldname, id];
    
        // 이미지 파일이 있을 경우
        if (req.file != undefined) {
            const { originalname } = req.file;
            values = [name, price, originalname, id]; // 이미지 파일명 업데이트
        }
    
        // 데이터베이스 연결 및 업데이트 쿼리 실행
        const conn = db_connect.getConnection();
        conn.query(db_sql.item_update, values, (e, result, fields) => {
            try {
                if (e) {
                    console.log('Update Error');
                    throw e;
                } else {
                    console.log('Update OK!');
                    res.redirect('/item/detail?id=' + id);
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    .get('/detail', (req, res) => {
        let id = req.query.id;
        conn = db_connect.getConnection();
        conn.query(db_sql.item_select_one, id, function (err, result, fields) {
            try {
                if (err) {
                    console.log('Select Error');
                    throw e;

                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'item/detail', 'item': result[0] });
                }
            } catch {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    .post('/registerimpl', upload.single('img'), (req, res) => {
        let name = req.body.name;
        let price = req.body.price;
        const { originalname } = req.file;
        console.log(`input data: ${name}, ${price}, ${originalname}`);

        let values = [name, price, originalname];
        const conn = db_connect.getConnection();

        conn.query(db_sql.item_insert, values, (err, result, fields) => {
            try {
                if (err) {
                    console.log('Insert Error:', err);
                    throw err;
                } else {
                    console.log('Insert OK');
                    res.redirect('/item/item1');
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    .get('/item3', (req, res) => {
        goto.go(req, res, { 'centerpage': 'item/item3' });
    });

module.exports = router;