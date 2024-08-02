import { api } from "../../utils/api";

// Define type for instructor sign-up and sign-in data
type InstructorAuthData = {
    userName: string;
    email: string;
    bio: string;
    password: string;
};

// Define type for OTP data
type OtpData = {
    otp: string;
    email: string;
};

// Define type for Course data (basic structure, can be expanded as needed)
export type CourseData = {
    _id?: string;
    thumbnail?: File | string;
    video?: File | string;
    title: string;
    subtitle: string;
    category: string;
    topic: string;
    price: number;
    instructor: string;
};

// Define type for curriculum sections and lectures
type Section = {
    id: string;
    name: string;
    isFree: boolean;
    order?: number;
    lectures: {
        id: string;
        name: string;
        notes?: string;
        description?: string;
        file?: File | string;
        video?: File| string;
    }[];
};

type CurriculumData = Section[];

export const instructorSignUpApi = async (data: InstructorAuthData) => {
    const response = await api.post("/auth/instructor/signUp", data);
    return response.data;
};

export const instructorSignInApi = async (data: {email: string, password: string}) => {
    const response = await api.post("/auth/instructor/signIn", data);
    return response.data;
};

export const instructorOtpSend = async (data: OtpData) => {
    const response = await api.post("/auth/instructor/verifyOtp", data);
    return response.data;
};

export const instructorForgotPassword = async (data: { email: string }) => {
    const response = await api.post("/auth/instructor/forgotPassword", data);
    return response.data;
};

export const listEnrollers = async () => {
    const response = await api.get("/instructor/listEnrollers");
    return response.data;
};

export const listCourses = async (data: { instructorId: string }) => {
    const response = await api.post("/instructor/listCourses", { data });
    return response.data;
};

export const addCourseApi = async (data: CourseData) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        const value = data[key as keyof CourseData];
        if (value instanceof File) {
            formData.append(key, value);
        } else if (value !== undefined) {
            formData.append(key, value.toString());
        }
    });
    const response = await api.post('/instructor/addCourse', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const curriculumApi = async (id: string, data: CurriculumData) => {
    const formData = new FormData();
    data.forEach((section, index) => {
        formData.append(`sections[${index}][id]`, section.id);
        formData.append(`sections[${index}][name]`, section.name);
        formData.append(`sections[${index}][isFree]`, section.isFree.toString());
        formData.append(`sections[${index}][order]`, section.order?.toString() || '');

        section.lectures.forEach((lecture, lectureIndex) => {
            const lecturePrefix = `sections[${index}][lectures][${lectureIndex}]`;
            formData.append(`${lecturePrefix}[id]`, lecture.id);
            formData.append(`${lecturePrefix}[name]`, lecture.name);
            formData.append(`${lecturePrefix}[notes]`, lecture.notes || '');
            formData.append(`${lecturePrefix}[description]`, lecture.description || '');

            if (lecture.file) {
                formData.append(`${lecturePrefix}[file]`, lecture.file);
            }
            if (lecture.video) {
                formData.append(`${lecturePrefix}[video]`, lecture.video);
            }
        });
    });

    const response = await api.post(`/instructor/${id}/curriculum`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const editCourseApi = async (id: string, data: CourseData) => {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
        const value = data[key as keyof CourseData];
        if (value !== undefined) {
            formData.append(key, value instanceof File ? value : value.toString());
        }
    }
    const response = await api.put(`/instructor/${id}/editCourse`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const updateCourseApi = async (id: string, data: CurriculumData) => {
    const formData = new FormData();
    data.forEach((section, index) => {
        formData.append(`sections[${index}][id]`, section.id);
        formData.append(`sections[${index}][name]`, section.name);
        formData.append(`sections[${index}][isFree]`, section.isFree.toString());
        formData.append(`sections[${index}][order]`, section.order?.toString() || '');

        section.lectures.forEach((lecture, lectureIndex) => {
            const lecturePrefix = `sections[${index}][lectures][${lectureIndex}]`;
            formData.append(`${lecturePrefix}[id]`, lecture.id);
            formData.append(`${lecturePrefix}[name]`, lecture.name);
            formData.append(`${lecturePrefix}[notes]`, lecture.notes || '');
            formData.append(`${lecturePrefix}[description]`, lecture.description || '');

            if (lecture.file) {
                formData.append(`${lecturePrefix}[file]`, lecture.file);
            }
            if (lecture.video) {
                formData.append(`${lecturePrefix}[video]`, lecture.video);
            }
        });
    });

    const response = await api.put(`/instructor/${id}/updateCourse`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deleteCourseApi = async (id: string, status: boolean) => {
    const response = await api.patch(`/instructor/${id}/changeStatus`, { status });
    return response.data;
};

export const forgotPasswordApi = async (data: { email: string }) => {
    const response = await api.post("/auth/instructor/forgetPassword", data);
    return response.data;
};

export const resetPasswordApi = async (data: { email:string ,otp:string, newPassword:string }) => {
    const response = await api.post("/auth/instructor/resetPassword", data);
    return response.data;
};

export const listBlockedCourses = async (instructorId: string) => {
    const response = await api.get(`/instructor/${instructorId}/blockedCourses`);
    return response.data;
};

export const listVerifiedCourses = async (instructorId: string) => {
    const response = await api.get(`/instructor/${instructorId}/verifiedCourses`);
    return response.data;
};

export const findInstructorId = async (email: string) => {
    const response = await api.get(`/instructor/getId?email=${email}`);
    return response.data;
};

export const findStudents = async (id: string) => {
    const response = await api.get(`/instructor/${id}/listChats`);
    return response.data;
};

export const getDetails = async (id: string) => {
    const response = await api.get(`/instructor/${id}/details`);
    return response.data;
};

export const addAssignment = async (id: string, data: FormData) => {
    try {
        const response = await api.post(`/instructor/${id}/createAssignment`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding assignment:', error);
        throw error;
    }
};

export const listAssignments = async (id: string) => {
    const response = await api.get(`/instructor/${id}/listAssignment`);
    return response.data;
};
