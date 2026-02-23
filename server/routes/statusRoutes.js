const express=require("express");   
const Employee = require("../models/employeeModel");

/*Honepage total active nd inactive employees*/

exports.totalActiveInactive=async (req,res)=>{
  try{
    const total=await Employee.countDocuments();  
    const active=await Employee.countDocuments({status:'active'});
    const inactive=await Employee.countDocuments({status:'inactive'});
    res.status(200).json({total,active,inactive});
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
}