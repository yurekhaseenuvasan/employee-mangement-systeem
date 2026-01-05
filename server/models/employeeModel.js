const mongoose=require('mongoose');
const validator=require('validator');
const employeeSchema=new mongoose.Schema({
    name:{
        required:[true,"Name is required"],
        type:String
    },
    position:{
        required:[true,"Position is required"], 
        type:String
    },
    department:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Department',
       required:true
    },
    email:{
        required:[true,"Email is required"],
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
       validate:{
        validator:validator.isEmail,
        message:'Please enter a valid email'
       }
    },
    location:{
        required:[true,"Location is required"],
        type:String
    },
    salary:{
        required:[true,"Salary is required"],
        type:Number
    },
    phone:{
        required:[true,"Phone number is required"],
        type:Number,
        match:[/^\d{10}$/, 'Please fill a valid 10 digit phone number']
    },
    photo:{
        type:String,
        default:'http://localhost:5000/uploads/Profile-PNG-File.png',
    }
});
module.exports=mongoose.model('Employee',employeeSchema);