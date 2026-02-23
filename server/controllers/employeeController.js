const express = require("express");
const router = express.Router();
const multer = require("multer");
const employeeRoutes = require("../routes/employeeRoutes");
//if tehre are no file uploads then ignore all storage logic jsut apss ot json ibfrontend
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


// Employee routes
router.get("/allemployees", employeeRoutes.allemp);
router.get("/:id", employeeRoutes.empById);
router.post("/add", upload.single("photo"), employeeRoutes.addEmp);
router.put("/:id", upload.single("photo"), employeeRoutes.updateEmp);
router.delete("/:id", employeeRoutes.deleteEmp);






module.exports = router;