const { time } = require('console');
var express = require('express');
var router = express.Router();
var operations = require('../operations/projects');

/* GET home page. */
router.get('/', function(req, res, next) {
  
    res.render('index', { 
    title: 'Clockeroo',
    currentPage: 'index',
    
 });
});

module.exports = router;
