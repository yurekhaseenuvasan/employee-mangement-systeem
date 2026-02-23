import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewAllEmployees from "./ViewAllEmployees";
import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";
import { Button } from "bootstrap";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [statusData, setStatusData] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(false);
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const fetchActiveInactiveEmp = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/status");
      const data = await response.json();
      if (!response.ok) {
        setError({
          status: response.status,
          message: data.message || "Failed to fetch employee status",
        });
      }
      setStatusData({
        total: data.total,
        active: data.active,
        inactive: data.inactive,
      });
      setLoading(false);
    } catch (err) {
      console.log("Error while fetching employee status", err);
      setError({
        status: "SERVER DOWN",
        message: "Unable to connect to the server. Please try again later.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveInactiveEmp();
  }, []);

  return (
    <div className="container mt-3 ">
      <div className="dashboard-wrapper">
        <div>
          <h4><span className="txt-primary">Welcome</span> Back,Yurekha <i className="fa-solid fa-user m-1 "></i> </h4>
          <p>
            This system allows you to manage employee information efficiently.
          </p>
          {/* <div className="add-btn mb-3">
            <span className="">To add a new employee, click the button </span>
            <Link
              to={"/add"}
              className="btn btn-primary me-2 btn-sm d-flex align-items-center justify-content-center"
            >
              <i className="fa-solid fa-circle-plus"></i>Add Employee
            </Link>
          </div> */}
        </div>

       {/*  <div className=" mt-2 mb-2 ">
          <input
            type="text"
            placeholder="Search Employee"
            className="form-control search"
            value={search}
            onChange={searchHandler}
          />
        </div> */}
      </div>
      <Loading loading={loading} />
      <ErrorComponent error={error} />
      {!loading && !error && (
        <>
          <div className="row mt-3">
            <div className="col-12 col-md-4 ">
              <div className="card ">
                <div className="card-body d-flex icon-gap total-card">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-users  "></i>
                  </div>
                  <div>
                    <p>Total Employees</p>
                    <p className="txt-number">{statusData.total}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="card">
                <div className="card-body d-flex icon-gap active-card">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-user-check  "></i>
                  </div>
                  <div>
                    <p>Active Employees</p>
                    <p className="txt-number">{statusData.active}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="card">
                <div className="card-body d-flex icon-gap inactive-card">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-user-xmark "></i>
                  </div>
                  <div>
                    <p>Inactive Employees</p>
                    <p className="txt-number">{statusData.inactive}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-4 icon-gap home-btn">
              <Link to={'/add'} className="btn y add-gradient">Add Employee<i className="fa-solid fa-circle-plus"></i></Link>
              <Link to={'/viewall'} className="btn  view-gradient">View All Employees<i className="fa-solid fa-angle-right"></i></Link>
            </div>
          </div>
          
        </>
      )}

      {/*  <Card search={search} /> */}
      {/*   <ViewAllEmployees search={search} /> */}
    </div>
  );
};

export default Homepage;
