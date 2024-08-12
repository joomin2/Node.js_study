require('dotenv').config();
const express=require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
const app = express();
const port = process.env.SERVER_PORT || 8081;

nunjucks.configure('views',{
    express:app,
})

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index',{
    })
})

app.get('/login', (req,res)=>{
    res.render('login',{
    })
})
app.get('/register', (req,res)=>{
    res.render('register',{
    })
})

app.get('/info', (req,res)=>{
    let data = {'id':'id01','name':'이말숙','age':20};
    res.render('info',data)
})

app.get('/item', (req,res)=>{
    let datas = [
     {'id':'id01','name':'이말숙','age':20},
     {'id':'id02','name':'이말숙2','age':30},
     {'id':'id03','name':'이말숙3','age':40},
    ];
    res.render('item', { custs: datas });
});
app.get('/join', (req,res)=>{
    res.render('join')
})
app.post('/impl',(req,res)=>{    res.render('result.html',{
        anything:req.body.textbox_content,
    })
});

app.listen(port,()=>{
});
    console.log(`server start port:${port}`)