import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
const Card = ({ employee, deleteHandler }) => {
  return (
    <div className="col-md-6 col-lg-4 col-12 card-col " key={employee.id}>
      <div className="card employee-card mb-3 ">
        <div className=" text-center card-header">
          <img
            src={
              employee.photo
                ? `http://localhost:5000/uploads/${employee.photo}`
                : "http://localhost:5000/uploads/Profile-PNG-File.png"
            }
            alt={employee.name}
            className="img-fluid emp-card-img"
          />
        </div>
        <div className="card-body justify-content-center">
          <h5 className="">{employee.name}</h5>
          <p className="emp-role"> {employee.position}</p>
          <p className="card-text">{employee.department}</p>
          <p className="card-text"> {employee.email}</p>
        </div>
        <div className=" btn-actions">
          <Link
            to={`/view/${employee.id}`}
            className="btn view-btn  btn-sm  "
          >
            <i className="fa-solid fa-eye"></i>View
          </Link>
          <Link
            to={`/edit/${employee.id}`}
            className="btn edit-btn btn-sm  "
          >
            <i className="fa-solid fa-pen"></i>Edit
          </Link>
          <button
            className="btn delete-btn btn-sm  "
            onClick={() => deleteHandler(employee.id)}
          >
            <i className="fa-solid fa-trash"></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
