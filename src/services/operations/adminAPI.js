import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { adminEndpoints } from "../apis"

const {
  GET_ADMIN_DASHBOARD_API,
  GET_ALL_INSTRUCTORS_API,
  GET_ALL_STUDENTS_API,
  GET_ALL_COURSES_ADMIN_API,
} = adminEndpoints

export async function getAdminDashboardData(token) {
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      GET_ADMIN_DASHBOARD_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Admin Dashboard Data")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ADMIN_DASHBOARD_API ERROR............", error)
    toast.error("Could Not Fetch Dashboard Data")
  }
  return result
}

export async function getAllInstructors(token) {
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTORS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructors")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_INSTRUCTORS_API ERROR............", error)
    toast.error("Could Not Fetch Instructors")
  }
  return result
}

export async function getAllStudents(token) {
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_STUDENTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Students")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_STUDENTS_API ERROR............", error)
    toast.error("Could Not Fetch Students")
  }
  return result
}

export async function getAllCoursesAdmin(token) {
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_COURSES_ADMIN_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSES_ADMIN_API ERROR............", error)
    toast.error("Could Not Fetch Courses")
  }
  return result
}
