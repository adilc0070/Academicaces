import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

type data = {
    email: string
    password: string
}

export const adminSignInApi = async (data: data) => {
    console.log(data)
    const response = await api.post('/auth/admin/login', data)
    return response.data
}

export const listStudentsApi= async () => {
    console.log("listStudents Api ")
    const response = await api.get('/admin/listUser')
    console.log(response);
    
    return response.data
}


export const blockStudentApi = async (id: string, status: string) => {
    const response = await api.patch(`/admin//changeStatus/${id}`, { status })
    return response.data
}

export const listInstructorsApi = async () => {
    
    const response = await api.get('/admin/listInstructors')
    console.log("listInstructors Api ",response.data);
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
export const listCatogoriesApi = async () => {
    const response = await api.get('/admin/listCatagories')    
    return response.data
}