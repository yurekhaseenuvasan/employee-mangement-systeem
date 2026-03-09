import React, { useEffect } from "react";
import FormEmployee from "../components/FormEmployee";
import { useParams, useNavigate } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import { getEmployeeById } from "../services/serviceApi";

const EditEmployee = () => {
  const [employeeData, setEmployeeData] = React.useState([]);
  const[error,setError]=React.useState("");
  const id = useParams().id;
  const navigate = useNavigate();
  const fetchEmpById = async () => {
    try {
      const res = await getEmployeeById(id);
      const data = await res.data;
      setError("");
      setEmployeeData({ ...data, department: data.department._id });
    } catch (err) {
      console.log("Error while fetching employee data", err);
          setError({
        status: err.status || "SERVER DOWN",
        message:
          err.message ||
          "The server is currently unreachable. Please try again later.",
          });
    }
  };
  useEffect(() => {
    fetchEmpById();
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
      setError({
        status: err.status || "UPDATE FAILED",
        message:
          err.message || "Failed to update employee. Please try again later.",
      });
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
          {error && <ErrorComponent status={error.status} message={error.message} />}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
