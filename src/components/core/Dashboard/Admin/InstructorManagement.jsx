import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllInstructors } from "../../../../services/operations/adminAPI"

export default function InstructorManagement() {
  const { token } = useSelector((state) => state.auth)
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true)
      const res = await getAllInstructors(token)
      if (res) {
        setInstructors(res)
      }
      setLoading(false)
    }
    fetchInstructors()
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
        Instructor Management
      </h1>

      <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700">
        <h2 className="text-xl font-bold text-richblack-5 mb-6">Registered Instructors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-richblack-700 text-richblack-200">
                <th className="pb-3 px-4 font-semibold">Name</th>
                <th className="pb-3 px-4 font-semibold">Email</th>
                <th className="pb-3 px-4 font-semibold">Total Courses</th>
                <th className="pb-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {instructors?.length > 0 ? (
                instructors.map((instructor, index) => (
                  <tr key={index} className="border-b border-richblack-700 hover:bg-richblack-700 transition-colors">
                    <td className="py-4 px-4 text-richblack-5 flex items-center gap-3">
                      <img 
                        src={instructor.image} 
                        alt="profile" 
                        className="h-10 w-10 rounded-full object-cover" 
                      />
                      <span>{instructor.firstName} {instructor.lastName}</span>
                    </td>
                    <td className="py-4 px-4 text-richblack-100">{instructor.email}</td>
                    <td className="py-4 px-4 text-richblack-100">{instructor.courses?.length || 0}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${instructor.active ? "bg-caribbeangreen-200 text-caribbeangreen-900" : "bg-pink-200 text-pink-900"}`}>
                        {instructor.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-richblack-200">
                    No instructors found.
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
