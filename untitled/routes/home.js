/**
 * Created by easys on 2015/6/7.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.post('/', function(req, res, next) {
    var myDate = new Date();
    var hours = myDate.getHours(); //获取当前小时数(0-23)
    var date = "";
    if(hours>=6 && hours<=12)
        date = "早上好";
    else if(hours>12 && hours<=18)
        date = " 下午好";
    else
        date = " 晚上好";
    var name = req.body.name.trim();
    if(name==""){
        res.redirect('index');
    }
    else {
        if(name=="easy") {
            var list = new Array();
            list.push({ 'id':1, 'img':'/images/上海浦东发展银行.jpg', 'remarks':'浦发银行', 'price':20000});
            list.push({ 'id':2, 'img':'/images/交通银行.jpg', 'remarks':'交通银行', 'price':1999});
            list.push({ 'id':3, 'img':'/images/光大银行.jpg', 'remarks':'光大银行', 'price':20000});
            list.push({ 'id':4, 'img':'/images/兴业银行.jpg', 'remarks':'兴业银行', 'price':1999});
            list.push({ 'id':5, 'img':'/images/华夏银行.jpg', 'remarks':'华夏银行', 'price':20000});
            list.push({ 'id':6, 'img':'/images/平安银行.jpg', 'remarks':'平安银行', 'price':1999});
            list.push({ 'id':7, 'img':'/images/广发银行.jpg', 'remarks':'广发银行', 'price':20000});
            list.push({ 'id':8, 'img':'/images/招商银行.jpg', 'remarks':'招商银行', 'price':1999});
            res.render('home', {title: "登陆成功", name: name, date: date,list:list});
        }
        else
            res.send("用户名或密码错误。");
    }
});

module.exports = router;