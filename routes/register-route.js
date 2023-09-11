const express = require('express')
const router = express.Router()

const{usRegister,checkUserName}=require('../controller/register-controller')

router.post('/user_register',usRegister)
router.post('/check_userName',checkUserName)


module.exports=router;