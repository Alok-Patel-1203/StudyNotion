import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAdminDashboardData } from "../../../../services/operations/adminAPI"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function Insights() {
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

  // Generate data for charts
  const generateChartData = () => {
    const labels = dashboardData?.courseStats?.map((course) => course.courseName) || []
    const studentsData = dashboardData?.courseStats?.map((course) => course.studentsEnrolled) || []
    const incomeData = dashboardData?.courseStats?.map((course) => course.revenue) || []

    // Random colors for the pie charts
    const colors = labels.map(() => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)

    return {
      studentsChart: {
        labels: labels,
        datasets: [
          {
            data: studentsData,
            backgroundColor: colors,
          },
        ],
      },
      incomeChart: {
        labels: labels,
        datasets: [
          {
            data: incomeData,
            backgroundColor: colors,
          },
        ],
      },
    }
  }

  const { studentsChart, incomeChart } = generateChartData()

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#C5C7D4',
        }
      }
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        Platform Insights
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700 shadow-sm flex flex-col gap-2">
          <p className="text-lg font-bold text-richblack-200">Total Users</p>
          <p className="text-4xl font-semibold text-richblack-5">
            {(dashboardData?.totalStudents || 0) + (dashboardData?.totalInstructors || 0)}
          </p>
        </div>
        <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700 shadow-sm flex flex-col gap-2">
          <p className="text-lg font-bold text-richblack-200">Total Revenue</p>
          <p className="text-4xl font-semibold text-richblack-5">
            ₹{dashboardData?.totalRevenue || 0}
          </p>
        </div>
      </div>

      {dashboardData?.courseStats?.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700 h-[400px]">
            <h2 className="text-xl font-bold text-richblack-5 mb-4">Students per Course</h2>
            <div className="relative h-[85%] w-full">
              <Pie data={studentsChart} options={chartOptions} />
            </div>
          </div>
          <div className="rounded-md bg-richblack-800 p-6 border border-richblack-700 h-[400px]">
            <h2 className="text-xl font-bold text-richblack-5 mb-4">Income per Course</h2>
            <div className="relative h-[85%] w-full">
              <Pie data={incomeChart} options={chartOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-md bg-richblack-800 p-6 border border-richblack-700 text-center text-richblack-200">
          Not enough data to display charts.
        </div>
      )}

      <div className="mt-8 rounded-md bg-richblack-800 p-6 border border-richblack-700 w-full">
        <h2 className="text-xl font-bold text-richblack-5 mb-6">Course Performance Details</h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-richblack-700 text-richblack-200">
                <th className="pb-3 px-4 font-semibold min-w-[200px]">Course Name</th>
                <th className="pb-3 px-4 font-semibold text-center">Students Enrolled</th>
                <th className="pb-3 px-4 font-semibold text-right">Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.courseStats?.length > 0 ? (
                dashboardData.courseStats.map((course, index) => (
                  <tr key={index} className="border-b border-richblack-700 hover:bg-richblack-700 transition-colors">
                    <td className="py-4 px-4 text-richblack-5 font-medium">{course.courseName}</td>
                    <td className="py-4 px-4 text-richblack-100 text-center">{course.studentsEnrolled}</td>
                    <td className="py-4 px-4 text-yellow-50 font-semibold text-right">₹{course.revenue}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-richblack-200">
                    No course data available.
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
