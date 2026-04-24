const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");

const {
	getAdminDashboardData,
	getAllInstructors,
	getAllStudents,
	getAllCoursesAdmin,
} = require("../controllers/Admin");

// Admin routes
router.get("/dashboard", auth, isAdmin, getAdminDashboardData);
router.get("/instructors", auth, isAdmin, getAllInstructors);
router.get("/students", auth, isAdmin, getAllStudents);
router.get("/courses", auth, isAdmin, getAllCoursesAdmin);

module.exports = router;
