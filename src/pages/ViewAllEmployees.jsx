import React, { useEffect, useState } from "react";
import Error from "../components/ErrorComponent";
import Loading from "../components/Loading";
import Card from "../components/Cards/Card";
import { getAllEmployees } from "../services/serviceApi";
import Breadcrumb from "../components/Breadcrumb";
const ViewAllEmployees = ({}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  async function fetchApi() {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      const data = await response.data;
      const loadedarr = [];
      /* data.forEach((item)=>{
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
        });  */
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.log("Error while fetching employee", err);
      setError({
        status: err.status ||"SERVER DOWN",
        message:
          err.message ||
          "The server is currently unreachable. Please try again later.",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete employee");
      }
      alert("Employee Deleted Successfully");
      await fetchApi();
    } catch (err) {
      console.log("Error while deleting employee", err);
      setError({
        status: err.status || "DELETE FAILED",
        message:
          err.message || "Failed to delete employee. Please try again later.",
      });
      // setLoading(false);
    }
  };
  const filteredEmployees = employees ? employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.name.toLowerCase().includes(search.toLowerCase()),
  ) : [];

  return (
    <>
      <div className="container mt-4">
            <Breadcrumb items={[{ label: "Home", path: "/" },{ label: "Employees"}]} />

        <div className="search-container">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search Employee"
            className="form-control search-input mb-3"
            value={search}
            onChange={searchHandler}
          />
          <span className="search-close" onClick={() => setSearch("")}>
            &#10006;
          </span>
        </div>

        <div className="row ">
          <Loading loading={loading} />
          {filteredEmployees.length>0 && filteredEmployees.map((employee) => {
            return (
              <Card
                employee={employee}
                deleteHandler={deleteHandler}
                key={employee._id}
              />
            );
          })}
          {filteredEmployees.length === 0 && !loading && error && (
            <Error status={error.status} message={error.message} />
          )}
          {filteredEmployees.length === 0 && !loading && !error && (
            <Error
              status={"NO EMPLOYEES"}
              message={"No employees found matching your search."}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAllEmployees;
