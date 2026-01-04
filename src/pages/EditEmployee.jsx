import React, { useEffect } from "react";
import FormEmployee from "../components/FormEmployee";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const [employeeData, setEmployeeData] = React.useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const getEmployeeById = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`);
      const data = await res.json();
      setEmployeeData({ ...data, department: data.department._id });
    } catch (err) {
      console.log("Error while fetching employee data", err);
    }
  };
  useEffect(() => {
    getEmployeeById();
  }, []);

  const onSubmit = async (state) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      navigate("/");
      alert("Employee Updated Successfully");
    } catch (err) {
      console.log("Error while updating employee", err);
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
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
