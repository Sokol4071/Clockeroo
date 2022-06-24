var express = require('express');
const { time } = require('console');
var router = express.Router();
var userscontroller = require('../controler/users-controler');


router.post('/signup',userscontroller.createuser);
router.get('/signup',userscontroller.signup);
router.post('/login',userscontroller.login);
//router.show('/logout',userscontroller.logout); 


module.exports = router;
