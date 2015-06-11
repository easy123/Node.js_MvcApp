/**
 * Created by easys on 2015/6/7.
 */
var express = require('express');
var router = express.Router();

var sqlOperater = require('../db/sqlOperater.js');


router.get('/', function(req, res, next) {
    var myDate = new Date();
    var hours = myDate.getHours(); //获取当前小时数(0-23)
    var user = req.session.get('users');
    console.log('Print User:');
    console.log(user);

    sqlOperater.query('select * from products', function (err,recordset) {
       // res.render('list',{product:recordset});
        res.render('home', {title: "登陆成功", name: req.session.has('users')?user.userName:"easy", am:hours>=6 && hours<=12,
            pm:hours>12 && hours<=18,night:hours >18,list:[
                { 'id':1, 'img':'/images/上海浦东发展银行.jpg', 'remarks':'浦发银行', 'price':20000},
                { 'id':2, 'img':'/images/交通银行.jpg', 'remarks':'交通银行', 'price':1999},
                { 'id':3, 'img':'/images/光大银行.jpg', 'remarks':'光大银行', 'price':20000},
                { 'id':4, 'img':'/images/兴业银行.jpg', 'remarks':'兴业银行', 'price':1999},
                { 'id':5, 'img':'/images/华夏银行.jpg', 'remarks':'华夏银行', 'price':20000},
                { 'id':6, 'img':'/images/平安银行.jpg', 'remarks':'平安银行', 'price':1999},
                { 'id':7, 'img':'/images/广发银行.jpg', 'remarks':'广发银行', 'price':20000},
                { 'id':8, 'img':'/images/招商银行.jpg', 'remarks':'招商银行', 'price':1999}
            ],
            product:recordset,
            partials:{footer:'footer'}});
    });
});

//删除数据
router.post('/delete',function(req,res,next){
    sqlOperater.query('delete  from products where id='+req.body.id,function(errs,recordsets){
        res.send({isSuccess:true});
    });
});
//添加数据
//router.post('/add',function(req,res,next){
//    var  str="insert into products(name,des,image) values('"+req.body.name+"','"+req.body.des+"','"+req.body.image+"')";
//    sqlOperater.query(str,function(err,recordset){
//        res.redirect("/home");
//    });
//});
//修改数据
router.post('/edit',function(req,res,next){
    var sql = "";
    var id = req.body.id;
    if(id)
        sql="update products set name='"+req.body.name+"', image='"+req.body.image+"', des='"+req.body.des+"' where id="+req.body.id;
    else
        sql = "insert into products(name,des,image) values('"+req.body.name+"','"+req.body.des+"','"+req.body.image+"')";
    sqlOperater.query(sql,function(err,recordset){
        res.send({isSuccess:true});
    });
});

module.exports = router;