const { time } = require('console');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
   let projects = [
      {
        id:1,
        pname:'Project 1',
        desc:'First project foe blade studio',
        time:'23:43',
        status:' Ongoing '
      },
      {
        id:2,
        pname:'Project 2',
        desc:'Second project foe blade studio',
        time:'23:43',
        status:' Finished '
      },
      {
        id:3,
        pname:'Project 3',
        desc:'Third project foe blade studio',
        time:'23:43',
        status:' Postopned '
      }];
  res.render('index', { 
    title: 'Clockeroo',
    currentPage: 'index',
    projects: projects
 });
});
router.get('/signup',function(req,res,next){
  res.render('signup',{
    title:'Sign Up',
    currentPage:'signup',
  });
});
router.get('/login',function(req,res,next){
  res.render('login',{
    title:'Log in',
    currentPage: 'login',
  });
});
router.get('/projects',function(req,res,next){
  res.render('projects',{
    title:'Projects',
    currentPage: 'projects',
  });
});
router.get('/projects/id',function(req,res,next){
  res.render('project',{
    title:'Projectspec',
    currentPage: 'project',
  });
});

module.exports = router;
