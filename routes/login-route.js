const express = require('express');
const router = express.Router();
const{loginUser}= require('../controller/login-controller');

router.post('/user_login',loginUser)

module.exports=router;