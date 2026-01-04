const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");


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
router.post("/add", async (req, res) => {
  const employeeData = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    email: req.body.email,
    location: req.body.location,
    salary: req.body.salary,
    phone: req.body.phone,
    photo: req.body.photo,
  });
  try {
    const savedEmployee = await employeeData.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//update employee by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Employee.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        position: req.body.position,
        department: req.body.department,
        email: req.body.email,
        location: req.body.location,
        salary: req.body.salary,
        phone: req.body.phone,
        photo: req.body.photo,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while updating employee with id ${id}` });
  }
});
//delete employee by id
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const deletedEmployee=await Employee.findByIdAndDelete(id);
        res.status(200).json(deletedEmployee);
    } catch (err) {
        res.status(500).json({ message: `Error while deleting employee with id ${id}` });
    }
})
module.exports = router;
