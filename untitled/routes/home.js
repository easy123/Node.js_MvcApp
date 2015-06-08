/**
 * Created by easys on 2015/6/7.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.post('/', function(req, res, next) {
    var name = req.body.name.trim();
    if(name==""){
        res.send("请输入用户名。");
    }
    else {
        if(name=="easy")
            res.render('home', {title: "登陆成功", name: name});
        else
            res.send("用户名或密码错误。");
    }
});

module.exports = router;