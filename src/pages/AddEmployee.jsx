import React from 'react';
import FormEmployee from '../components/FormEmployee';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
  const navigate=useNavigate();
  const onSubmit=async(state)=>{
    //console.log(state);
     try{
       const response=await fetch("http://localhost:5000/api/employees/add",{
        method:"POST",
        body:state
       });
       //await response;
        if(response.ok){
        alert("Employee Added Successfully");
        navigate('/')
        }
     
    }    catch(err){
        console.log("Error while adding employee",err);
       } 
  }
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'>
         <FormEmployee onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee