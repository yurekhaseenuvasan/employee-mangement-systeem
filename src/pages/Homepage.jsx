import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Cards/Card";

const Homepage = () => {
  const[search,setSearch]=useState("");
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
 
  return (
    <div className="container mt-3 ">
      <div className="dashboard-wrapper">
        <div>
          <h4>Welcome to the Employee Management System</h4>
          <p>
            This system allows you to manage employee information efficiently.
          </p>
          <div className="add-btn mb-3">
            <span className="">To add a new employee, click the button </span>
            <Link
              to={"/add"}
              className="btn btn-primary me-2 btn-sm d-flex align-items-center justify-content-center"
            >
              <i className="fa-solid fa-circle-plus"></i>Add Employee
            </Link>
          </div>
        </div>
     

      <div className=" mt-2 mb-2 ">
        <input
          type="text"
          placeholder="Search Employee"
          className="form-control search"
          value={search}
          onChange={searchHandler}
        />
      </div>
      </div>

      <Card search={search} />
    </div>
  );
};

export default Homepage;
