const express = require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks'); //html파씽
const bodyParser = require('body-parser');

// Database 연동
//var db_connect = require('../db/db_connect');
//var db_sql = require('../db/db_sql');

// My Util
var goto = require('../util/goto');

// /block
router
    .get('/', (req, res) => {
        goto.go(req, res, { 'centerpage': 'html/center' });
    })
    .get('/html1', (req, res) => {
        goto.go(req, res, { 'centerpage': 'html/html1' });
    })
    .get('/html2', (req, res) => {
        goto.go(req, res, { 'centerpage': 'html/html2' });
    })
    .get('/html3', (req, res) => {
        goto.go(req, res, { 'centerpage': 'html/html3' });
    });



module.exports = router;