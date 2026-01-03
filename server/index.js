const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require('path');
const { connect } = require('http2');
dotenv.config({path:path.resolve(__dirname, 'config.env')});
const app=express();
app.use(express.json());


//monogb connection
const mongostring=process.env.DATABASE_URL

 mongoose.connect(mongostring,{
    serverSelectionTimeoutMS:5000
 }).
then(()=>{
    console.log("DB connected successfully");
})
.catch((err)=>{
    console.log("DB connection error:",err);
    process.exit(1);
});
mongoose.connection.on('error',(err)=>{
    console.error(`DB connection error:${err}`);
});


//server running
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})