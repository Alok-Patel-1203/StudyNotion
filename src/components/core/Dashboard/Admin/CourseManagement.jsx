import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllCoursesAdmin } from "../../../../services/operations/adminAPI"

export default function CourseManagement() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const res = await getAllCoursesAdmin(token)
      if (res) {
        setCourses(res)
      }
      setLoading(false)
    }
    fetchCourses()
  }, [token])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Course Management
      </h1>

      <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700">
        <h2 className="text-xl font-bold text-richblack-5 mb-6">Platform Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-richblack-700 text-richblack-200">
                <th className="pb-3 px-4 font-semibold">Course Details</th>
                <th className="pb-3 px-4 font-semibold">Instructor</th>
                <th className="pb-3 px-4 font-semibold">Price</th>
                <th className="pb-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses?.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={index} className="border-b border-richblack-700 hover:bg-richblack-700 transition-colors">
                    <td className="py-4 px-4 text-richblack-5 flex items-center gap-3">
                      <img 
                        src={course.thumbnail} 
                        alt="course thumbnail" 
                        className="h-[60px] w-[60px] rounded-md object-cover" 
                      />
                      <div>
                        <p className="font-semibold text-richblack-5">{course.courseName}</p>
                        <p className="text-xs text-richblack-300">
                          {course.category?.name || "General"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-richblack-100">
                      {course.instructor?.firstName} {course.instructor?.lastName}
                    </td>
                    <td className="py-4 px-4 text-yellow-50">₹{course.price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${course.status === "Published" ? "bg-caribbeangreen-200 text-caribbeangreen-900" : "bg-richblack-200 text-richblack-900"}`}>
                        {course.status || "Draft"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-richblack-200">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
