import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAdminDashboardData } from "../../../../services/operations/adminAPI"

export default function AdminDashboard() {
  const { token } = useSelector((state) => state.auth)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAdminData = async () => {
      setLoading(true)
      const res = await getAdminDashboardData(token)
      if (res) {
        setDashboardData(res)
      }
      setLoading(false)
    }
    getAdminData()
  }, [token])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Admin Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Statistics Cards */}
        <div className="flex flex-col gap-4 rounded-md bg-richblack-800 p-6 shadow-sm border border-richblack-700">
          <p className="text-lg font-bold text-richblack-200">Total Courses</p>
          <p className="text-4xl font-semibold text-richblack-5">
            {dashboardData?.totalCourses || 0}
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-richblack-800 p-6 shadow-sm border border-richblack-700">
          <p className="text-lg font-bold text-richblack-200">Total Students</p>
          <p className="text-4xl font-semibold text-richblack-5">
            {dashboardData?.totalStudents || 0}
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-richblack-800 p-6 shadow-sm border border-richblack-700 sm:col-span-2 lg:col-span-1">
          <p className="text-lg font-bold text-richblack-200">Total Instructors</p>
          <p className="text-4xl font-semibold text-richblack-5">
            {dashboardData?.totalInstructors || 0}
          </p>
        </div>
      </div>
      
      <div className="mt-8 rounded-md bg-richblack-800 p-6 border border-richblack-700 w-full">
        <h2 className="text-xl font-bold text-richblack-5 mb-4">Platform Overview</h2>
        <p className="text-richblack-200 leading-relaxed">
          Welcome to the admin dashboard. Here you have a high-level view of the platform's courses,
          instructors, and students. Navigate to the other tabs for more detailed management.
        </p>
      </div>
    </div>
  )
}
