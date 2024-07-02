import { api } from "../../utils/api"

type data = {
    email: string
    password: string
}

export const adminSignInApi = async (data: data) => {
    console.log(data)
    const response = await api.post('/auth/admin/login', data)
    return response.data
}

export const listStudentsApi = async (page = 1, limit = 10) => {
    console.log("listStudents Api ")
    const response = await api.get(`/admin/listUser?page=${page}&limit=${limit}`);
    console.log(response);
    return response.data;
}



export const blockStudentApi = async (id, status) => {
    const response = await api.patch(`/admin/changeStatus/${id}`, { status });
    return response.data;
};


export const listInstructorsApi = async () => {

    const response = await api.get('/admin/listInstructors')
    console.log("listInstructors Api ", response.data);
    return response.data
}

export const verifyInstructorApi = async (id: string) => {
    const response = await api.patch(`/admin/verifyInstructor/${id}`)
    return response.data
}

export const deleteInstructorApi = async (id: string) => {
    const response = await api.delete(`/admin/deleteInstructor/${id}`)
    return response.data
}

export const blockInstructorApi = async (id: string) => {
    const response = await api.patch(`/admin/blockInstructor/:${id}`)
    return response.data
}

export const addCategoryApi = async (data) => {
    const response = await api.post('/admin/addCatagorie', data)
    return response.data
}
export const listCatogoriesApi = async (page = 1, limit = 8) => {
    const response = await api.get(`/admin/listCatagories?page=${page}&limit=${limit}`);
    return response.data;
}
export const deleteCategoryApi = async (id: string) => {
    console.log('id', id);

    const response = await api.delete(`/admin/deleteCatagory/${id}`)
    return response.data
}

export const updateCategoryApi = async (id: string, data) => {
    const response = await api.patch(`/admin/updateCatagory/${id}`, data)
    console.log("response.data from api", response.data);
    return response.data
}
export const toggleCategoryBlockApi = async (id: string, status: boolean) => {
    console.log("id", id, "status", status);

    const response = await api.patch(`/admin/catagory/${id}/changeStatus`, { status })
    return response.data
}

export const listAllCoursesApi = async () => {
    const response = await api.get('/admin/listAllCourses')
    return response.data
}

export const verifieCourseApi = async (id: string, status: boolean) => {
    const response = await api.patch(`/admin/course/${id}/changeStatus`, { status })
    return response.data
}