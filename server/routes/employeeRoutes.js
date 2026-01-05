const express = require("express");
const multer = require("multer");
const router = express.Router();
const Employee = require("../models/employeeModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
//get employee list
router.get("/allemployees", async (req, res) => {
  try {
    const employees = await Employee.find({}).populate("department");
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get employee by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id).populate("department");
    if (employee) {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).json({ message: `No employee found with id ${id}` });
  }
});
//add new employee
router.post("/add", upload.single("photo"), async (req, res) => {
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
});
//update employee by id
router.put("/:id", upload.single("photo"), async (req, res) => {
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
});
//delete employee by id
router.delete("/:id", async (req, res) => {
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
});
module.exports = router;
