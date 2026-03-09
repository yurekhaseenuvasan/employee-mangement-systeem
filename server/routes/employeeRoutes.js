const express = require("express");
const multer = require("multer");
const router = express.Router();
const Employee = require("../models/employeeModel");


//get employee list
exports.allemp=async (req, res) => {
  try {
    const employees = await Employee.find({}).populate("department");
    if(!employees || employees.length === 0)    {
      return res.status(404).json({message:"No employees found"});
    }
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error while fetching employees"});
  }
};
//get employee by id
exports.empById=async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id).populate("department");
    if (employee) {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).json({ message: `No employee found with id ${id}` });
  }
};
//add new employee
exports.addEmp=async (req, res) => {
  const exisitingEmployee = await Employee.findOne({ email: req.body.email });
  if (exisitingEmployee) {
    return res.status(400).json({ message: "Employee with this email already exists" });
  }
  const employeeData = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    email: req.body.email,
    location: req.body.location,
    salary: req.body.salary,
    phone: req.body.phone,
    photo: req.file ? req.file.filename : null,
   
  });
  console.log("Received employee data:", employeeData);
  try {
    const savedEmployee = await employeeData.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error("Error while saving employee:", err);
    res.status(500).json({ message: err.message });
  }
};
//update employee by id
exports.updateEmp=async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: `Employee with id ${id} not found` });
    }

    const data = await Employee.findByIdAndUpdate(
      id,
      {
        name: req.body.name ? req.body.name : employee.name,
        position: req.body.position ? req.body.position : employee.position,
        department: req.body.department
          ? req.body.department
          : employee.department,
        email: req.body.email ? req.body.email : employee.email,
        location: req.body.location ? req.body.location : employee.location,
        salary: req.body.salary ? req.body.salary : employee.salary,
        phone: req.body.phone ? req.body.phone : employee.phone,
        photo: req.file ? req.file.filename : employee.photo,
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (err) {
    console.error("Error while updating employee:", err);
    res
      .status(500)
      .json({ message: `Error while updating employee with id ${id}` });
  }
};
//delete employee by id
exports.deleteEmp=async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: `Employee with id ${id} not found` });
    }
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.status(200).json(deletedEmployee);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while deleting employee with id ${id}` });
  }
};

