const { time } = require('console');
var express = require('express');
var router = express.Router();
var projectcontroller = require('../controler/project-controler');

router.get('/',projectcontroller.index);
router.get('/:id',projectcontroller.show);
router.get('/add/project',projectcontroller.add);
router.post('/add/project',projectcontroller.create);
router.post('/:id/delete',projectcontroller.delete);
  
module.exports = router;
