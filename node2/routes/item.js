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
    .get('/item3', (req, res) => {
        goto.go(req, res, { 'centerpage': 'item/item3' });
    });

module.exports = router;