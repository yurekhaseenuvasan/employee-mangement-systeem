import React, { useEffect } from "react";
import FormEmployee from "../components/FormEmployee";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const [employeeData, setEmployeeData] = React.useState([]);
  const[errors,setError]=React.useState("");
  const id = useParams().id;
  const navigate = useNavigate();
  const getEmployeeById = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`);
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message || "Failed to fetch employee data");
      }
      setError("");
      setEmployeeData({ ...data, department: data.department._id });
    } catch (err) {
      console.log("Error while fetching employee data", err);
          setError(err.message);
    }
  };
  useEffect(() => {
    getEmployeeById();
  }, []);

  const onSubmit = async (state) => {
    //console.log(state)
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "PUT",
          body: state
        }
      );
  const data=await response.json();
      if(!response.ok){
        throw new Error(data.message || "Failed to update employee");
      }
      setError("");
      navigate("/");
      alert("Employee Updated Successfully");
    } catch (err) {
      console.log("Error while updating employee", err);
      //axios->err.response.data.message || err.message
      setError(err.message);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <FormEmployee
            mode="edit"
            employeeData={employeeData}
            onSubmit={onSubmit}
          />
          {errors && <p className="text-danger mt-2">{errors}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
