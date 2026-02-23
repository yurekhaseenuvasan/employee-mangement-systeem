const express=require('express');
const router=express.Router();
const statusController=require('../routes/statusRoutes');
router.get("/", statusController.totalActiveInactive);
module.exports=router;