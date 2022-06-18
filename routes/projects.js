const { time } = require('console');
var express = require('express');
var router = express.Router();
var operations = require('../operations/projects');


router.get('/',async function(req,res,next){
    try {
      let projects = await operations.getAllProjects();
  
      console.log(projects);
      
      res.render('projects',{
      title:'Projects',
      currentPage: 'projects',
      projects: projects
    });
    } catch (error) {
      console.log(error);
      
    }
    
  });
  router.get('/:id',async function(req,res,next){
    let id = req.params.id;
    let project = await operations.getProjectbyId(req.params.id);
    res.render('project',{
      title:'Projectspec',
      currentPage: 'project',
      id: id,
      project: project
    });
  });
  
  module.exports = router;