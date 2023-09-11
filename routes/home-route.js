const express = require('express');
const router = express.Router();
const{getData,saveData,dataDelete,dataUpdate,getDataById,searchResult}= require('../controller/home-controller');

router.get('/get_data',getData)
router.post('/save_data',saveData)
router.delete('/data_delete/:t_id',dataDelete);
router.put('/note_update/:t_id',dataUpdate);
router.get('/getById/:t_id',getDataById);
router.get('/search/:searchText',searchResult)


module.exports=router;