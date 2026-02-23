import React, { useEffect, useState } from "react";
import Error from "../components/ErrorComponent";
import Loading from "../components/Loading";
import Card from "../components/Cards/Card";
const ViewAllEmployees = ({}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const[search,setSearch]=useState('');
  const searchHandler=(e)=>{
    setSearch(e.target.value);
  }
  async function fetchApi() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/employees/allemployees");
      const data = await response.json();
   
      if (!response.ok) {
       setError({status:response.status,message:data.message || "Failed to fetch employee"});
      } else {
        const loadedarr=[];
        data.forEach((item)=>{
          loadedarr.push({
            id:item._id,
            name:item.name,
            position:item.position,
            department:item.department.name,
            email:item.email,
            location:item.location,
            phone:item.phone,
            salary:item.salary,
            photo:item.photo
          });
        });
        setEmployees(loadedarr);
        setLoading(false);
      }
    } 
     catch(err){
      console.log("Error while fetching employee",err);
      setError({
        status:err.status || "SERVER DOWN",
        message:err.message || "The server is currently unreachable. Please try again later."
      })
      setLoading(false);
    }
  }
  console.log(error)
  useEffect(() => {
    fetchApi();
  }, []);
  const deleteHandler=async(id)=>{
    try{
      const response=await fetch(`http://localhost:5000/api/employees/${id}`,{
        method:"DELETE",
      });
      if(!response.ok){
        const data=await response.json();
        throw new Error(data.message || "Failed to delete employee");
      }
      alert("Employee Deleted Successfully");
      await fetchApi();
        }
    catch(err){
      console.log("Error while deleting employee",err);
      setError({
        status:err.status || "DELETE FAILED",
        message:err.message || "Failed to delete employee. Please try again later."
      })
     // setLoading(false);
    }
  }
  const filteredEmployees=employees?.filter((employee)=>
     employee.name.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <>
    <div className="container mt-4">
          <input type="text" placeholder="Search Employee" className="form-control search mb-3" value={search} onChange={searchHandler}/>

    <div className="row ">
      <Loading loading={loading} />
      {filteredEmployees.map((employee) => {
        return (
         <Card employee={employee} deleteHandler={deleteHandler} key={employee.id} />
        );
      })}
      {filteredEmployees.length===0 && !loading && error && (
        <Error status={error.status} message={error.message} />
      )}
    </div>
    </div>
    </>
  );
};

export default ViewAllEmployees;
