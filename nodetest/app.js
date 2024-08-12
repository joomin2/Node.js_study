require('dotenv').config();
const express=require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
const app = express();
const port = process.env.SERVER_PORT || 90;

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

app.get('/dev_info', (req, res) => {
    const dev_url = 'https://github.com/joomin2';
    res.render('dev_info', { dev_url }); // dev_url을 객체 형태로 전달
});


app.get('/item', (req, res) => {
    const datas = [
        {'메뉴명': '아이스초코', 'price': 2000, 'image': 'chogo.jpg'},
        {'메뉴명': '죠리퐁음료', 'price': 3000, 'image': 'snack.jpg'},
        {'메뉴명': '아이스커피', 'price': 4000, 'image': 'sugar_coffee.jpg'}
    ];
    
    res.render('item', { menus: datas });
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