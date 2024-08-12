const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks'); //html파씽
const bodyParser = require('body-parser'); 

// Database 연동
//var db_connect = require('../db/db_connect');
//var db_sql = require('../db/db_sql');

// My Util
//var goto = require('../util/goto');

// /block
router
    .get('/', (req,res)=>{
    res.render('index',{'centerpage' : 'geo/center'});
})
    .get('/geo1', (req,res)=>{
    res.render('index',{'centerpage' : 'geo/geo1'});
})
    .get('/geo2', (req,res)=>{
    res.render('index',{'centerpage' : 'geo/geo2'});
})
    .get('/geo3', (req,res)=>{
    res.render('index',{'centerpage' : 'geo/geo3'});
});

module.exports = router;