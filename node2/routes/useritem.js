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
        let userid = req.query.userid || req.session.userid || req.user.id;
    
        // MySQL 연결 생성
        let conn = db_connect.getConnection();
    
        // SQL 쿼리 실행
        conn.query(db_sql.cart_select_one, [userid], (err, result, fields) => {
            try {
                if (err) {
                    console.log('Select Error');
                    throw err;
                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'useritem/cart', 'items': result });
                }
            } catch (err) {
                console.log(err);
            } finally {
                db_connect.close(conn);
            }
        });
    })

    .post('/addcart', (req, res) => {
        let count = req.body.count;
        let userid = req.body.userid;
        let itemid = req.body.itemid;
        conn = db_connect.getConnection();

        let values = [itemid];

        conn.query(db_sql.item_select_one, values, (e, result, fields) => {
            try {
                if (e) {
                    console.log('Select_one Error');
                    throw e;
                } else {
                    console.log(result[0]);
                    console.log(result[0].name);
                    console.log(result[0].price);
                    console.log(result[0].price * count);

                    let values = [userid, itemid, result[0].name, result[0].price, count, result[0].price * count];

                    conn.query(db_sql.cart_insert, values, (e, result, fields) => {
                        try {
                            if (e) {
                                console.log('Insert Error');
                                throw e;
                            } else {
                                console.log('Insert OK !');
                                res.redirect('/useritem/cart?userid='+userid);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    });
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
        console.log(id);
        conn = db_connect.getConnection();

        conn.query(db_sql.item_select_one, id, function (err, result, fields) {
            try {
                if (err) {
                    console.log('Select Error');
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