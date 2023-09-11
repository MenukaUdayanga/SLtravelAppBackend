const express = require('express');
const router = express.Router();
const{saveMap,getMap,updateMap,deleteMap}=require('../controller/map-controller')


router.post('/save_map',saveMap)
router.get('/get_map',getMap)
router.put('/update_map/:id',updateMap)
router.delete('/delete_map/:id',deleteMap)


module.exports=router;