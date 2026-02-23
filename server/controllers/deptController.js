 const express=require('express');
const router=express.Router();
const deptController=require('../routes/deptRoutes');

router.get("/alldept", deptController.allDept);
router.post("/add-dept", deptController.addDept);
module.exports=router; 