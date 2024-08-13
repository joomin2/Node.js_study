const express = require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks'); //html파씽
const bodyParser = require('body-parser');

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

// My Util
var goto = require('../util/goto');

// /block
router
    // .get('/', (req, res) => {
    //     goto.go(req, res, { 'centerpage': 'item/center' });
    // })
    .get('/', (req, res) => {
        conn = db_connect.getConnection();


        conn.query(db_sql.item_select, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;

                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'useritem/select', 'items': result })
                }
            } catch {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }

        });

    })
    .get('/cart', (req, res) => {
        // 로그인된 사용자의 ID를 얻어옴 (세션이나 다른 인증 방법에 따라 변경 필요)
        let id = req.session.userid || req.user.id;  // 예시로, 세션에서 id를 가져오는 경우
    
        // MySQL 연결 생성
        conn = db_connect.getConnection();
    
        // SQL 쿼리 실행
        conn.query(db_sql.cart_select_one, [id], function (err, result, fields) {
            try {
                if (err) {
                    console.log('Select Error');
                    throw err;
                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'useritem/cart', 'items': result });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        })
    })
    .post('/addcart', (req, res) => {
        let count = req.body.count;
        let userid = req.body.userid;
        let itemid = req.body.itemid;

        console.log(count);
        console.log(userid);
        console.log(itemid)
       
        conn = db_connect.getConnection();
        goto.go(req, res, { 'centerpage': 'useritem/cart' });
    })
    .get('/detail', (req, res) => {
        let id = req.query.id;
        console.log(id);
        conn = db_connect.getConnection();

        conn.query(db_sql.item_select_one, id, function (err, result, fields) {
            try {
                if (err) {
                    console.log('Select Error  폼 태그가 비어있음 !');
                    throw err;
                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'useritem/detail', 'item': result[0] });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
     
    });



module.exports = router;