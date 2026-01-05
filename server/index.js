const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const multer=require('multer');
const cors=require('cors');
const path=require('path');
const routers=require('./routes/employeeRoutes');
const deptRoutes=require('./routes/deptRoutes');

//configuring dotenv
dotenv.config({path:path.resolve(__dirname, 'config.env')});
const app=express();//

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/employees',routers);
app.use('/api/departments',deptRoutes);

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

//monogb connection
const mongostring=process.env.DATABASE_URL
 mongoose
   .connect(mongostring, {
     serverSelectionTimeoutMS: 5000,
   })
   .then(() => {
     console.log("DB connected successfully");
   })
   .catch((err) => {
     console.log("DB connection error:", err);
     process.exit(1);
   });
mongoose.connection.on('error',(err)=>{
    console.error(`DB connection error:${err}`);
});


//server running
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})