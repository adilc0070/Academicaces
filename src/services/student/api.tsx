import { api } from "../../utils/api";
type data = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const signInApi = async ({ data }: { data: data }) => {

    const response = await api.post("auth/user/signIn", data);
    return response.data;
}

export const signUpApi = async ({ data }: { data: { userName: string, email: string, password: string } }) => {
    const response = await api.post("auth/user/signUp", data);
    return response.data;
}
export const otpSend = async ({ data }: { data: data }) => {
    const response = await api.post(`auth/user/verifyOtp`, data)
    return response.data;
}
export const forgotPassword = async ({ data }: { data: data }) => {
    const response = await api.post(`auth/user/forgotPassword/`, data)
    return response.data;
}

export const resetPassword = async ({ data }: { data: data }) => {
    const response = await api.post(`auth/user/resetPassword/`, data)
    return response.data;
}

export const resendOtp = async ({ data }: { data: data }) => {
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

export const findID = async ( email: string ) => {
    const response = await api.get(`/student/getId?email=${email}`);
    return response.data
}
export const findInstructors = async ( id: string ) => {
    const response = await api.get(`/student/${id}/listChats`);
    return response.data
}
export const isEnrolled = async ( id: string , courseId: string) => {
    const response = await api.get(`/student/${id}/course/${courseId}/isEnrolled`);
    return response.data
}

export const postReview = async ({data}:{data: {id: string, rating: number, feedback: string, courseId: string}}) => {    
    const response = await api.post(`/student/${data.id}/${data.courseId}/postReview`, data)
    return response
}
export const listReviews= async (courseId:string) => {    
    const response = await api.get(`/student/${courseId}/listReviews`)
    return response
}