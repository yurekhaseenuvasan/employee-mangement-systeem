const express=require('express');
const router=express.Router();;
const departmentModal=require('../models/deptModel');

router.get('/alldept',async(req,res)=>{
    try{
        const data=await departmentModal.find({});
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/add-dept',async(req,res)=>{
    const data=new departmentModal({
        name:req.body.name
    });
    try{
        const savedDept=await data.save();
        res.status(201).json(savedDept);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
module.exports=router;