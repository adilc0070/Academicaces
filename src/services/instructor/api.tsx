import axios from "axios";



const api = axios.create({
    baseURL: "http://localhost:3000",
});

type data={
    userName: string
    email: string
    bio: string
    password: string
}

export const instructorSignUpApi = async (data: data) => {    
    const response = await api.post("/auth/instructor/signUp", data)
    console.log(response.data);
    return response.data
}

export const instructorSignInApi = async (data: data) => {
    const response = await api.post("/auth/instructor/signIn", data)
    return response.data
}

export const instructorOtpSend = async (data: data) => {
    const response = await api.post("/auth/instructor/verifyOtp", data)
    return response.data
}

export const instructorForgotPassword = async (data: data) => {
    const response = await api.post("/auth/instructor/forgotPassword", data)
    return response.data
}

export const listEnrollers = async () => {
    const response = await api.get("/instructor/listEnrollers")
    return response.data
}

export const listCourses = async () => {
    const response = await api.get("/instructor/listCourses")
    return response.data
}
export const addCourseApi=async (data)=>{
    console.log('dat',data)
    const response = await api.post('/instructor/addCourse',data)
    return response.data

}



