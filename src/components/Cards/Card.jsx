import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import Error from "../Error";
import Loading from "../Loading";
const Card = ({search}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function fetchApi() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/employees/allemployees");
      const data = await response.json();
      if (response.ok) {
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
    } catch (err) {
      console.log("Error while fetching employees data", err);
      setError(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);
  const deleteHandler=async(id)=>{
    try{
      const response=await fetch(`http://localhost:5000/api/employees/${id}`,{
        method:"DELETE",
      });
      if(response.ok){
       // setLoading(true);
        alert("Employee Deleted Successfully");
        await fetchApi();
        //setLoading(false);
      }
    }catch(err){
      console.log("Error while deleting employee",err);
      setError(err);
     // setLoading(false);
    }
  }
  const filteredEmployees=employees?.filter((employee)=>
     employee.name.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="row ">
      <Loading loading={loading} />
     {error && <div className="card text-center w-50 text-bold p-5 m-auto">{error.message}</div>}
      {filteredEmployees.map((employee) => {
        return (
          <div className="col-md-6 col-lg-4 col-12 card-col " key={employee.id}>
            <div className="card employee-card mb-3 ">
              <div className=" text-center card-header">
                <img
                  src={employee.photo ? employee.photo : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"}
                  alt={employee.name}
                  className="img-fluid"
                />
              </div>
              <div className="card-body justify-content-center">
                <h3 className="card-title text-center">{employee.name}</h3>
                <p className="card-text"> {employee.position}</p>
                <p className="card-text">{employee.department}</p>
                <p className="card-text"> {employee.email}</p>
              </div>
              <div className="card-footer btn-actions">
                <Link
                  to={`/view/${employee.id}`}
                  className="btn view-btn me-2 btn-sm w-100 me-2"
                >
                  <i className="fa-solid fa-eye"></i>View
                </Link>
                <Link
                  to={`/edit/${employee.id}`}
                  className="btn edit-btn btn-sm w-100 me-2"
                >
                  <i className="fa-solid fa-pen"></i>Edit
                </Link>
                <button className="btn delete-btn btn-sm w-100 me-2" onClick={()=>deleteHandler(employee.id)}>
                  <i className="fa-solid fa-trash"></i>Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {filteredEmployees.length===0 && !loading && !error && (
        <Error message={"No Employees Found"} />
      )}
    </div>
  );
};

export default Card;
