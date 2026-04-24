const Course = require("../models/Course");
const User = require("../models/User");

exports.getAdminDashboardData = async (req, res) => {
	try {
		const courses = await Course.find({});
		const students = await User.countDocuments({ accountType: "Student" });
		const instructors = await User.countDocuments({ accountType: "Instructor" });

		// Calculate total revenue
		let totalRevenue = 0;
		courses.forEach((course) => {
			totalRevenue += (course.price || 0) * (course.studentsEnrolled?.length || 0);
		});

		const courseStats = courses.map((course) => ({
			_id: course._id,
			courseName: course.courseName,
			studentsEnrolled: course.studentsEnrolled?.length || 0,
			revenue: (course.price || 0) * (course.studentsEnrolled?.length || 0),
		}));

		res.status(200).json({
			success: true,
			data: {
				totalCourses: courses.length,
				totalStudents: students,
				totalInstructors: instructors,
				totalRevenue,
				courseStats,
			},
		});
	} catch (error) {
		console.error("Admin Dashboard Error:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

exports.getAllInstructors = async (req, res) => {
	try {
		const instructors = await User.find({ accountType: "Instructor" })
			.populate("courses")
			.populate("additionalDetails")
			.exec();
		res.status(200).json({ success: true, data: instructors });
	} catch (error) {
		console.error("Get Instructors Error:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

exports.getAllStudents = async (req, res) => {
	try {
		const students = await User.find({ accountType: "Student" })
			.populate("additionalDetails")
			.exec();
		res.status(200).json({ success: true, data: students });
	} catch (error) {
		console.error("Get Students Error:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

exports.getAllCoursesAdmin = async (req, res) => {
	try {
		const courses = await Course.find({})
			.populate("instructor")
			.populate("category")
			.exec();
		res.status(200).json({ success: true, data: courses });
	} catch (error) {
		console.error("Get Courses Error:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
