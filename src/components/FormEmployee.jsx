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
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    //converting to base64 string
    /*  const reader=new FileReader();
    reader.onloadend=()=>{
        setPhotoPreview(reader.result);
    }
    reader.readAsDataURL(file); */
    setPhotoPreview(URL.createObjectURL(file));
    setPhoto(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const getDepartment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments/alldept");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };
  console.log("Employee Data in FormEmployee:", employeeData._id);
  useEffect(() => {
    getDepartment();
    if (mode === "edit" && employeeData) {
      setState({
        name: employeeData.name || "",
        position: employeeData.position || "",
        department: employeeData.department || "",
        email: employeeData.email || "",
        location: employeeData.location || "",
        phone: employeeData.phone || "",
        salary: employeeData.salary || "",
      });
      setPhotoPreview(employeeData.photo);
    }
  }, [mode, employeeData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    //for json we need to pass photo and state separately
    /* const payload = {
      ...state,
      photo: photoPreview ? photoPreview :employeeData.photo ? employeeData.photo : null,
    }; */
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("position", state.position);
    formData.append("department", state.department);
    formData.append("email", state.email);
    formData.append("location", state.location);
    formData.append("phone", state.phone);
    formData.append("salary", state.salary);
    if (photo) {
      formData.append("photo", photo);
    }
    //if use json then we need to pass id ,no ned for formdata
    /* if(mode=="edit"){
        onSubmit({ id: employeeData._id, formData});
    }
    else{
       // onSubmit(formData);
    } */
    onSubmit(formData);
    //outputing to see values of formdata
    /* for(let pair of formData.entries()){
        console.log(pair[0]+ ', ' + pair[1]); 
    } */
  };
  return (
    <div className="card  mx-auto form-card mb-5">
      <div className="card-header">
        <h4 className="text-center text-white">
          {mode === "edit" ? "Edit Employee" : "Add Employee"}
        </h4>
      </div>
      <div className="card-body">
        <form encType="multipart/form-data">
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
            {/*  <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={state.department}
              name="department"
            /> */}
            <select
              className="form-select mt-2 d-block form-control"
              name="department"
              value={state.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id} className="">
                  {dept.name}
                </option>
              ))}
            </select>
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
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              {mode === "edit" ? "Update Image:" : "Image:"}
            </label>
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
