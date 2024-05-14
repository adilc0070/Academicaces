import axios from "axios";



const api = axios.create({
    baseURL: process.env.BASE_URL,
});

type data={
    userName: string
    email: string
    bio: string
    password: string
}

export const instructorSignUpApi = async (data: data) => {
    const response = await api.post("/auth/instructor/signup", data)
    return response.data
}

export const instructorSignInApi = async (data: data) => {
    const response = await api.post("/auth/instructor/signin", data)
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



