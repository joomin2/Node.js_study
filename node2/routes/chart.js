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
        goto.go(req, res, { 'centerpage': 'chart/center' });
    })
    .get('/chart1', (req, res) => {
        goto.go(req, res, { 'centerpage': 'chart/chart1' });
    })
    .get('/chart2', (req, res) => {
        goto.go(req, res, { 'centerpage': 'chart/chart2' });
    })
    .get('/chart3', (req, res) => {
        goto.go(req, res, { 'centerpage': 'chart/chart3' });
    });



module.exports = router;