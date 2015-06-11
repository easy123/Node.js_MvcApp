/**
 * Created by easys on 2015/6/10.
 */
var express = require('express');
var router = express.Router();

var sqlOperater = require('../db/sqlOperater.js');

router.get('/', function(req, res, next) {
    sqlOperater.query('select top 1 * from products', function (err,recordset) {
        res.render('list',{product:recordset});
    });
});

module.exports = router;