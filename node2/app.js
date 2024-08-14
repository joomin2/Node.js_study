require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 80;

// MySQL Database Connection 
var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');

// Login 처리를 위한 Library
const session = require('express-session');
const MemoryStore = require("memorystore")(session);
// Passport lib 
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
// My util
var goto = require('./util/goto');


// CORS 지정
const cors = require("cors");
app.use(cors());
nunjucks.configure('views', {
    express: app,
});
// html 환경 설정, post, public
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// ---------------------------------------------------------------
//파일 업로드 





//--------------------------------------------------------------------------------
// Login 처리 


// Session 선언 

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,

        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        })
    })
);

// 2. Passport를 이용한 로그인 처리 

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (req, user, done) {
    console.log('serializeUser' + user);
    console.log('serializeUser' + user.id);
    console.log('serializeUser' + user.name);
    console.log('serializeUser' + user.acc);
    //사용자의 정보를 서버에 저장 'passport' 객체를 이용하여
    done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (req, user, done) {
    console.log('Login User' + user.name + ' ' + user.id);
    done(null, user);
});

// local login 전략을 세우는 함수
// client에서 전송되는 변수의 이름이 각각 id, pw이므로 
// usernameField, passwordField에서 해당 변수의 값을 받음
// 이후부터는 username, password에 각각 전송받은 값이 전달됨
// 위에서 만든 login 함수로 id, pw가 유효한지 검출
// 여기서 로그인에 성공하면 위의 passport.serializeUser 함수로 이동

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "pwd",
        },
        function (userid, password, done) {
            console.log('--------------------------' + userid);
            console.log('--------------------------' + password);

            conn = db_connect.getConnection();
            conn.query(db_sql.cust_select_one, [userid], (err, row, fields) => {

                if (err) throw err;

                let result = 0;
                // console.log('--------------------------' + row[0]['pwd']);


                if (row[0] == undefined) {
                    return done(null, false, { message: "Login Fail " });
                } else if (row[0]['pwd'] != password) {
                    return done(null, false, { message: "Login Fail " });
                } else {
                    let name = row[0]['name'];
                    let acc = row[0]['acc'];
                    return done(null, { id: userid, name: name, acc: acc });
                }

            });

        }
    )
);
// 사용자 정보 데이터 (body)를 넘길떄 (submit) 버튼을 로그인 submit버튼 페이지에서 누를떄 
// login 요청이 들어왔을 때 성공시 / 로, 실패시 /login 으로 리다이렉트
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",            //정상일떄 메인페이지로
        failureRedirect: "/loginerror",  //실패일때 에러페이지로
    })
);

// 2. Passport를 이용한 로그인 처리 끝 ,로그인 실패시
app.get('/loginerror', (req, res) => {
    goto.go(req, res, {
        'centerpage': 'loginerror'
    })
})
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})
//---------------------------------------------------------------------------
// http://127.0.0.1/
app.get('/', (req, res) => {
    goto.go(req, res, undefined);  //무조건 index.html을 뿌린다 + undefined 는 center가 비어있다.

});

app.get('/login', (req, res) => {
    goto.go(req, res, { 'centerpage': 'login' })
});

app.get('/register', (req, res) => {
    goto.go(req, res, { 'centerpage': 'register' });
});

app.get('/about', (req, res) => {
    goto.go(req, res, { 'centerpage': 'about' })
});

// POST 요청으로 변경 (loginimpl)
app.post('/loginimpl', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    console.log(id + ' ' + pwd);
    goto.go(req, res, undefined);
});
// POST 요청으로 변경 (registerimpl)
app.post('/registerimpl', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;
    let acc = req.body.acc;
    console.log(id + ' ' + pwd + ' ' + name + ' ' + acc + ' ');
    conn = db_connect.getConnection();
    let values = [id, pwd, name, acc];
    //db_sql.cust_insert, values 이걸 집어넣으면 (e, result, fields) 이것이 실행 )  
    conn.query(db_sql.cust_insert, values, (e, result, fields) => {
        try {
            if (e) {
                console.log('Insert Error');
                throw e;
            } else {
                console.log('Insert OK !');
                goto.go(req, res, { 'centerpage': 'registerok' });
            }
        } catch (e) {
            goto.go(req, res, { 'centerpage': 'registerfail' });
            console.log(e);
        } finally {
            db_connect.close(conn);
        }
    });
});

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

const useritem = require('./routes/useritem');
app.use('/useritem', useritem);

const admin = require('./routes/admin');
app.use('/admin', admin);
//--------------------------------------------------------------------------------
//--------------- server start--------------------------------------

app.listen(port, () => {
    console.log(`server start port:${port}`);
});
