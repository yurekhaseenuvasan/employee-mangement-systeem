import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormEmployee = ({ onSubmit, mode, employeeData }) => {
  const [state, setState] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    location: "",
    phone: "",
    salary: "",
  });
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const[photoPreview,setPhotoPreview]=useState("");
  const handlePhotoChange = (e) => {
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.onloadend=()=>{
        setPhotoPreview(reader.result);
    }
    reader.readAsDataURL(file);
    //setPhoto(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
 
  useEffect(()=>{
    if(mode==="edit" && employeeData){
        setState({
        name: employeeData.name || "",
        position: employeeData.position || "",
        department: employeeData.department || "",    
        email: employeeData.email || "",
        location: employeeData.location || "",
        phone: employeeData.phone || "",
        salary: employeeData.salary || "",
        })
        setPhotoPreview(employeeData.photo);
    }

  },[mode,employeeData])

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...state,
      photo: photoPreview ? photoPreview : employeeData.photo,
    };
    
    if(mode=="edit"){
        onSubmit({...payload,id:employeeData.id});
    }
    else{
        onSubmit(payload);
    }
  };
  console.log(state);
  return (
    <div className="card  mx-auto form-card mb-5">
      <div className="card-header">
        <h4 className="text-center text-white">
          {mode === "edit" ? "Edit Employee" : "Add Employee"}
        </h4>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={state.name}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={state.position}
              name="position"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={state.department}
              name="department"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address:</label>
            <input
              type="email"
              className="form-control"
              onChange={handleChange}
              value={state.email}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={state.location}
              name="location"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile:</label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={state.phone}
              name="phone"
            />
          </div>
          <div className="mb-3">
             {photoPreview&& <img src={photoPreview} alt="Preview" width={120} height={120} style={{'objectFit':'cover'}} />}
          </div>
       
          <div className="mb-3">
            <label className="form-label">{mode === "edit" ? "Update Image:" : "Image:"}</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handlePhotoChange}
              placeholder="Update image"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Salary:</label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={state.salary}
              name="salary"
            />
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between m-3">
        <Link to="/" className="btn cancel-btn ">
          Cancel
        </Link>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={submitHandler}
        >
          {mode === "edit" ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </div>
  );
};

export default FormEmployee;
