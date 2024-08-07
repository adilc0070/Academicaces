import { api } from "../../utils/api";

type SignInData = {
    email: string,
    password: string,
    rememberMe: boolean
}

type SignUpData = {
    userName: string,
    email: string,
    password: string
}

type PostReviewData = {
    id: string,
    rating: number,
    feedback: string,
    courseId: string
}

type CourseQueryData = {
    category: string,
    sort: number,
    page: number,
    limit: number,
    search: string
}

type EnrollData = {
    courseId: string,
    studentId?: string,
    hash?: string,
    email?: string
}

export const signInApi = async ({ data }: { data: SignInData }) => {
    const response = await api.post("auth/user/signIn", data);
    return response.data;
}

export const signUpApi = async ({ data }: { data: SignUpData }) => {
    const response = await api.post("auth/user/signUp", data);
    return response.data;
}

export const otpSend = async ({ data }: { data: {otp:string,email:string}}) => {
    const response = await api.post(`auth/user/verifyOtp`, data);
    return response.data;
}

export const forgotPassword = async ({ data }: { data: SignInData }) => {
    const response = await api.post(`auth/user/forgotPassword/`, data);
    return response.data;
}

export const resetPassword = async ({ data }: { data: SignInData }) => {
    const response = await api.post(`auth/user/resetPassword/`, data);
    return response.data;
}

export const resendOtp = async ({ data }: { data: SignInData }) => {
    const response = await api.post(`auth/user/resendOtp/`, data);
    return response.data;
}

export const listCourses = async (data: CourseQueryData) => {
    try {
        const response = await api.get(`/student/listCourse?category=${data.category}&sort=${data.sort}&page=${data.page}&limit=${data.limit}&search=${data.search}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const enroll = async (data: EnrollData) => {
    const response = await api.post("/student/enroll", { data });
    return response.data;
}
type EnrollCourseData = {
    courseId: string,
    price: number,
    image: string
}

export const buyCourse = async (data: EnrollCourseData) => {
    const response = await api.post('/student/enrollCourse', data);
    return response.data;
}

export const mycourses = async (data: { student: string }) => {
    const response = await api.get(`/student/myCourses/${data.student}`);
    return response.data;
}

export const getCourse = async (data: { courseId: string }) => {
    const response = await api.get(`/student/${data.courseId}/viewCourse`);
    
    return response.data;
}

export const findID = async (email: string) => {
    const response = await api.get(`/student/getId?email=${email}`);
    return response.data;
}

export const findInstructors = async (id: string) => {
    const response = await api.get(`/student/${id}/listChats`);
    return response.data;
}

export const isEnrolled = async (id: string, courseId: string) => {
    const response = await api.get(`/student/${id}/course/${courseId}/isEnrolled`);
    return response.data;
}

export const postReview = async ({ data }: { data: PostReviewData }) => {
    const response = await api.post(`/student/${data.id}/${data.courseId}/postReview`, data);
    return response;
}

export const listReviews = async (courseId: string) => {
    const response = await api.get(`/student/${courseId}/listReviews`);
    return response;
}

export const postReply = async ({ reviewId, comment, studentId }: { reviewId: string, comment: string, studentId: string }) => {
    const response = await api.post(`/student/reviews/${reviewId}/reply`, { comment, studentId });
    return response;
};

export const getAssignment = async (id: string) => {
    const response = await api.get(`/student/${id}/getAssignment`);
    return response.data;
}
