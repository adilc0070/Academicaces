import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});
type data = {
    email: string,
    password: string,
    rememberMe: boolean
}


export const signInApi = async ({ data }: { data: data }) => {

    const response = await api.post("auth/user/signIn", data);
    return response.data;
}

export const signUpApi = async ({ data }: { data: {userName: string, email: string, password: string} }) => {
    const response = await api.post("auth/user/signUp", data);
    return response.data;
}
export const otpSend = async ({ data }: { data: data }) => {
    console.log("data from otp send api", data);
    const response = await api.post(`auth/user/verifyOtp`, data)
    return response.data;
}
export const forgotPassword = async ({ data }: { data: data }) => {
    console.log("data from forgot password api", data);
    const response = await api.post(`auth/user/forgotPassword/`, data)
    return response.data;
}

export const resetPassword = async ({ data }: { data: data }) => {
    console.log("data from reset password api", data);
    const response = await api.post(`auth/user/resetPassword/`, data)
    return response.data;
}

export const resendOtp = async ({ data }: { data: data }) => {
    console.log("data from resend otp api", data);
    const response = await api.post(`auth/user/resendOtp/`, data)
    return response.data;
}


export const listCourses = async (data: { category: string, sort: string, page: number, limit: number, search: string }) => {

    try {

        const response = await api.get(`/student/listCourse?category=${data.category}&sort=${data.sort}&page=${data.page}&limit=${data.limit}&search=${data.search}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const enroll = async (data) => {

    const response = await api.post("/student/enroll", { data });
    console.log('response', response);
    return response.data
}
// export const 


export const buyCourse = async (data) => {
    console.log("data from buy course api", data);

    const response = await api.post('/student/enrollCourse', data)
    return response
}

export const mycourses = async (data) => {
    const response = await api.get(`/student/myCourses/${data?.student}`);
    console.log(response.data);
    return response.data;
}
export const getCourse = async (data) => {
    const response = await api.get(`/student/${data.courseId}/viewCourse`);
    return response.data;
}