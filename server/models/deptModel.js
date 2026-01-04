const mongoose=require('mongoose');
const deptSchema=new mongoose.Schema({
    name:{
        required:[true,"Department name is required"],  
        type:String
    }
});
module.exports=mongoose.model('Department',deptSchema); 