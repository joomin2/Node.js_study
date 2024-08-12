require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 3000;

// MySQL Database Connection 
var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');


nunjucks.configure('views', {
    express: app,
});

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// http://127.0.0.1/
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('index', { 'centerpage': 'login' });
});

app.get('/register', (req, res) => {
    res.render('index', { 'centerpage': 'register' });
});

app.get('/about', (req, res) => {
    res.render('index', { 'centerpage': 'about' });
});

// POST 요청으로 변경 (loginimpl)
app.post('/loginimpl', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    console.log(id + ' ' + pwd);
    res.render('index');
});

// POST 요청으로 변경 (registerimpl)
app.post('/registerimpl', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;
    let acc = req.body.acc;
    console.log(id + ' ' + pwd + ' ' + name + ' ' + acc+ ' ');
    conn = db_connect.getConnection();

    let values = [id,pwd,name,acc];
    //db_sql.cust_insert, values 이걸 집어넣으면 (e, result, fields) 이것이 실행 )  
    conn.query(db_sql.cust_insert, values, (e, result, fields) => {
        try{
        if(e){
            console.log('Insert Error');
            throw e;
        }else{
            console.log('Insert OK !');
            res.render('index',{'centerpage':'registerok'});
        } 
       }  catch(e){
        res.render('index',{'centerpage':'registerfail'});
            console.log(e);
        } finally{   
            db_connect.close(conn);
         }
    });
});



// POST 요청으로 변경 (registerimpl)
// app.post('/updateimpl',(req, res) => {
//     let id = req.body.id;
//     let pwd = req.body.pwd;
//     let name = req.body.name;
//     let acc = req.body.acc;
//     console.log(id + ' ' + pwd + ' ' + name + ' ' + acc+ ' ');
//     conn = db_connect.getConnection();

//     let values = [id,pwd,name,acc];
//     //db_sql.cust_insert, values 이걸 집어넣으면 (e, result, fields) 이것이 실행 )  
//     conn.query(db_sql.cust_update, values, (e, result, fields) => {
//         try{
//         if(e){
//             console.log('update Error');
//             throw e;
//         }else{
//             console.log('update OK !');
//             res.render('cust/detail',{'centerpage':'detailok'});
//         } 
//        }  catch(e){
//         res.render('cust/detail',{'centerpage':'detailfail'});
//             console.log(e);
//         } finally{   
//             db_connect.close(conn);
//          }
//     });
// });
//app.js-> 라우터폴더의 html을 보여줌 
const html = require('./routes/html');
app.use('/html', html);

const geo = require('./routes/geo');
app.use('/geo', geo);

const chart = require('./routes/chart');
app.use('/chart', chart);

const cust = require('./routes/cust');
app.use('/cust', cust);

const item = require('./routes/item');
app.use('/item', item);


app.listen(port, () => {
    console.log(`server start port:${port}`);
});
