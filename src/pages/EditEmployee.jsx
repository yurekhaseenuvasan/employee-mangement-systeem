import React, { useEffect } from 'react';
import FormEmployee from '../components/FormEmployee';
import { useParams,useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const[employeeData,setEmployeeData]=React.useState([]);
  const id=useParams().id;
  const navigate=useNavigate();
  const getEmployeeById=async()=>{
    try{
    const res=await fetch(`http://localhost:5000/employees/${id}`);
    const data=await res.json();
    setEmployeeData(data);
    console.log(data);


    }
    catch(err){
      console.log("Error while fetching employee data",err);
    }
  }
  useEffect(()=>{
    getEmployeeById();
  },[])

  const onSubmit=async(state)=>{
    try{
      const response=await fetch(`http://localhost:5000/employees/${id}`,
        { 
           method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(state)
     

    });
    if(!response.ok){
      throw new Error("Failed to update employee");
    }
    navigate('/');
    alert("Employee Updated Successfully");
    console.log(state);
  
  }  catch(err){
      console.log("Error while updating employee",err);
    }
  }
   

  return (
     <div className='container mt-3'>
      <div className='row'>
        <div className='col'>
         <FormEmployee mode="edit" employeeData={employeeData} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default EditEmployee