import React, { useState } from 'react';
import FormEmployee from '../components/FormEmployee';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/serviceApi';
import ErrorComponent from '../components/ErrorComponent';


const AddEmployee = () => {
  const navigate=useNavigate();
  const[error,setError]=useState("")
  const onSubmit=async(state)=>{
    //console.log(state);
     try{
       const response=await addEmployee(state);
       const data=await response.data;
        alert("Employee Added Successfully");
        navigate('/')
        setError("");
        
     
    }    catch(err){
         console.log("Error while adding employee",err);
         setError({
           status: err.status || "SERVER DOWN",
           message:
             err.message ||
             "The server is currently unreachable. Please try again later.",
         });
       } 
  }
 
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'>
          {!error && <FormEmployee onSubmit={onSubmit}/>}
         {/* Display error message if there are any errors during form submission modal */}
         {error && <ErrorComponent status={error.status} message={error.message} />}
        </div>
      </div>
    </div>
  )
}

export default AddEmployee