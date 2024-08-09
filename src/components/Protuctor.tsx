import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate} from "react-router-dom"

export function AdminIsLoggedIn({children}) {

    const adminId = useSelector((state: RootState) => state?.admin?.email)
    const adminToken = localStorage.getItem('adminToken')

    return (
        Boolean(adminId) && Boolean(adminToken) ? <>{children}</> : <Navigate to='/admin/signIn' />
    )
}


export function AdminIsLoggedOut({children}) {

    const adminId = useSelector((state: RootState) => state?.admin?.email)
    const adminToken = localStorage.getItem('adminToken')
    return (
        Boolean(adminId) && Boolean(adminToken)  ? <Navigate to='/admin/dashboard' /> : <>{children}</> 
    )
}


export function StudentIsLoggedIn({children}) {

    const userId = useSelector((state: RootState) => state?.student?.email)
    const userToken = localStorage.getItem('studentToken')
    console.log('user logined aaan ');
    
    return (
        Boolean(userId) && Boolean(userToken) ? <>{children}</> : <Navigate to='/signIn' />
    )
}


export function StudentIsLoggedOut({children}) {

    const userId = useSelector((state: RootState) => state?.student?.email)
    const userToken = localStorage.getItem('studentToken')
    console.log('user logined alla ');
    

    return (
        Boolean(userId) && Boolean(userToken) ? <Navigate to='/home' /> : <>{children}</>
    )
}


export function InstructorIsLoggedIn({children}) {

    const instructorId = useSelector((state: RootState) => state?.instructor?.email)
    const instructorToken = localStorage.getItem('instructorToken')

    return (
        (Boolean(instructorId) && Boolean(instructorToken)) ? <>{children}</> : <Navigate to='/instructor/signIn' />
    )
}


export function InstructorIsLoggedOut({children}) {

    const instructorId = useSelector((state: RootState) => state?.instructor?.email)
    const instructorToken = localStorage.getItem('instructorToken')

    return (

        (Boolean(instructorId) && Boolean(instructorToken)) ? <Navigate to='/instructor/profile' /> : <>{children}</> 

    )
}