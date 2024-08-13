module.exports = {
    go: function (req, res, obj) {
        let loginid, loginname;
        if (req.user) {
            loginid = req.user.id;
            loginname = req.user.name;
        }

        if (loginid != undefined) {
            if (obj != undefined) {
                obj.loginid = loginid;
                // {,'loginid':loginid}
                res.render('index', obj);
            } else {
                //로그인이 성공적으로 되었을 경우 
                res.render('index', { 'loginid': loginid });
            }
        } else {
            if (obj != undefined) {
                res.render('index', obj);
            } else {
                //로그인이 undefined이 아니라는건 --> 로그인 성공 
                res.render('index');
            }
        }
    } // end go function
}