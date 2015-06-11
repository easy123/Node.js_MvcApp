var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/index', function(req, res, next) {
  console.log('正在提交');
  var name = req.body.name.trim();
  if(name==""){
    console.log('home 登陆失败');
    res.redirect('index');
  }
  else {
    if(name=="easy") {
      console.log('提交成功');
      req.session.put('users',{userName:name});
      res.redirect('home');
    }
    else
      res.redirect('index');
  }
});

module.exports = router;
