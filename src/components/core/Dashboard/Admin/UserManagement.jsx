import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllStudents } from "../../../../services/operations/adminAPI"

export default function UserManagement() {
  const { token } = useSelector((state) => state.auth)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      const res = await getAllStudents(token)
      if (res) {
        setStudents(res)
      }
      setLoading(false)
    }
    fetchStudents()
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
        User Management
      </h1>

      <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700">
        <h2 className="text-xl font-bold text-richblack-5 mb-6">Registered Students</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-richblack-700 text-richblack-200">
                <th className="pb-3 px-4 font-semibold">Name</th>
                <th className="pb-3 px-4 font-semibold">Email</th>
                <th className="pb-3 px-4 font-semibold">Enrolled Courses</th>
                <th className="pb-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {students?.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index} className="border-b border-richblack-700 hover:bg-richblack-700 transition-colors">
                    <td className="py-4 px-4 text-richblack-5 flex items-center gap-3">
                      <img 
                        src={student.image} 
                        alt="profile" 
                        className="h-10 w-10 rounded-full object-cover" 
                      />
                      <span>{student.firstName} {student.lastName}</span>
                    </td>
                    <td className="py-4 px-4 text-richblack-100">{student.email}</td>
                    <td className="py-4 px-4 text-richblack-100">{student.courses?.length || 0}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${student.active ? "bg-caribbeangreen-200 text-caribbeangreen-900" : "bg-pink-200 text-pink-900"}`}>
                        {student.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-richblack-200">
                    No students found.
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
