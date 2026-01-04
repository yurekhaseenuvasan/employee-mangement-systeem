import React from 'react';
import FormEmployee from '../components/FormEmployee';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
  const navigate=useNavigate();
  const onSubmit=(state)=>{
     try{
       const response=fetch("http://localhost:5000/api/employees",{
        method:"POST",
        headers:{   
            "Content-Type":"application/json"
        },
        body:JSON.stringify(state)
       });
     
        alert("Employee Added Successfully");
        navigate('/')
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