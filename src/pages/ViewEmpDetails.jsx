import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ViewEmpDetails = () => {
  const empid = useParams().id;
  const [loading, setloading] = useState(false);
  const [employee, setEmployee] = useState("");
  const [error, setError] = useState("");

  const fetchEmployeeByid = async () => {
    try {
      setloading(true);
      const response = await fetch(`http://localhost:5000/api/employees/${empid}`);
      const data = await response.json();
      if (response.ok) {
        setEmployee({
          id: data._id,
          name: data.name,
          position: data.position,  
          department: data.department.name,
          email: data.email,
          location: data.location,
          phone: data.phone,
          salary: data.salary,
          photo: data.photo
        });
        setloading(false);
      }
    } catch (err) {
      console.log("Error while fetching employee details", err);
      setError(err);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchEmployeeByid();
  }, []);
  return (
    <>
    {employee.length===0 && <Loading loading={loading} />}
      {error && (
        <div className="card text-center w-50 text-bold p-5 m-auto">
          {error.message}
        </div>
      )}
    
      <div className="container mt-3 view-card ">
        <div className="row">
          <div className="col">
            <div className="card  m-auto">
              <div className="card-header">
                <h3>Employee Details</h3>
              </div>
              <div className="card-body d-flex view-emp-details">
                <div>
                  <img
                    src={employee.photo}
                    alt={employee.name}
                  />
                
                </div>
                <div className="grid">
                  <p>
                    <strong>Name:</strong> {employee.name}
                  </p>
                  <p>
                    <strong>Position:</strong> {employee.position}
                  </p>
                  <p>
                    <strong>Department:</strong> {employee.department}
                  </p>
                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>
                  <p>
                    <strong>Location:</strong> {employee.location}
                  </p>
                  <p>
                    <strong>Phone:</strong> {employee.phone}
                  </p>
                  <p>
                    <strong>Salary:</strong> ${employee.salary}
                  </p>
                </div>
              </div>
              <div className=" txt-right m-3">
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ViewEmpDetails;
