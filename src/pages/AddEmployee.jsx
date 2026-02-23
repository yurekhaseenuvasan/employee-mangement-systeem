import React from 'react';
import FormEmployee from '../components/FormEmployee';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
  const navigate=useNavigate();
  const[errors,setError]=React.useState("");
  const onSubmit=async(state)=>{
    //console.log(state);
     try{
       const response=await fetch("http://localhost:5000/api/employees/add",{
        method:"POST",
        body:state
       });
       const data=await response.json();
       if(!response.ok){
        throw new Error(data.message || "Failed to add employee");
       }
       //await response;
     
        alert("Employee Added Successfully");
        navigate('/')
        setError("");
        
     
    }    catch(err){
         console.log("Error while adding employee",err);
         setError(err.message);
       } 
  }
  console.log(errors)
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'>
         <FormEmployee onSubmit={onSubmit}/>
         {/* Display error message if there are any errors during form submission modal */}
          {errors && <p className='text-danger mt-2'>{errors  }</p>}
        </div>
      </div>
    </div>
  )
}

export default AddEmployee