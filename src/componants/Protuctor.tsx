import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"

export function AdminIsLoggedIn() {

    const adminId = useSelector((state:RootState)=>state.admin.email)

  return (
    adminId ? <Outlet/>: <Navigate to='/admin/signIn'/> 
  )
}


export function AdminIsLoggedOut() {

    const adminId = useSelector((state:RootState)=>state.admin.email)

    return (
      adminId ? <Navigate to='/admin/dashboard'/> : <Outlet/>
    )
}


export function StudentIsLoggedIn() {

    const userId = useSelector((state:RootState)=>state.student.email)

    return (
      userId ? <Outlet/>: <Navigate to='/user/signIn'/> 
    )
}


export function StudentIsLoggedOut() {

    const userId = useSelector((state:RootState)=>state.student.email)

    return (
        userId ? <Navigate to='/home'/> : <Outlet/>
    )
}


export function InstructorIsLoggedIn() {

    const doctorId = useSelector((state:RootState)=>state.instructor.email)

    return (
        doctorId ? <Outlet/>: <Navigate to='/instructor/signIn'/> 
    )
}


export function InstructorIsLoggedOut() {

    const doctorId = useSelector((state:RootState)=>state.instructor.email)

    return (

        doctorId ? <Navigate to='/instructor/home'/> : <Outlet/>

    )
}