import { api } from "../../utils/api";
import { CourseData } from "../instructor/api";

// Define type for admin authentication data
type AdminAuthData = {
    email: string;
    password: string;
};


// Define type for category data
type CategoryData = {
    name: string;
    noCoures: number;
    _id: string;
    isBlock: boolean;
};
interface categories {
    catogaries: CategoryData[];
    total: number;
}

export const adminSignInApi = async (data: AdminAuthData): Promise<{admin:{admin:{email:string,password:string},token:string,message:string,status:boolean},message:string,status:boolean,statusCode:number}> => {
    const response = await api.post('/auth/admin/login', data);
    console.log(response.data);
    return response.data;
};

export const listStudentsApi = async (page: number = 1, limit: number = 10): Promise<{ data:[],message:string,total:number}> => {
    
    const response = await api.get(`/admin/listUser?page=${page}&limit=${limit}`);
    console.log(response.data);
    return response.data;
};

export const blockStudentApi = async (id: string, status: boolean): Promise<void> => {
    const response = await api.patch(`/admin/changeStatus/${id}`, { status });
    return response.data;
};

export const listInstructorsApi = async (): Promise<{data:[{name:string,email:string,_id:string,isBlock:boolean,bio:string}],message:string}> => {
    const response = await api.get('/admin/listInstructors');
    console.log("listInstructors Api ", response.data);
    return response.data;
};

export const verifyInstructorApi = async (id: string): Promise<void> => {
    const response = await api.patch(`/admin/verifyInstructor/${id}`);
    return response.data;
};

export const deleteInstructorApi = async (id: string): Promise<void> => {
    const response = await api.delete(`/admin/deleteInstructor/${id}`);
    return response.data;
};

export const blockInstructorApi = async (id: string): Promise<void> => {
    const response = await api.patch(`/admin/blockInstructor/${id}`);
    return response.data;
};

export const addCategoryApi = async (data: {value: string}): Promise<{catogary:CategoryData[]}> => {
    const response = await api.post('/admin/addCatagorie', data);
    return response.data;
};

export const listCategoriesApi = async (page: number = 1, limit: number = 8): Promise<categories> => {
    
    const response = await api.get(`/admin/listCatagories?page=${page}&limit=${limit}`);
    console.log( response.data);
    return response.data;
};

export const deleteCategoryApi = async (id: string): Promise<void> => {
    // console.log('id', id);
    const response = await api.delete(`/admin/deleteCatagory/${id}`);
    return response.data;
};

export const updateCategoryApi = async (id: string, data: {name: string}): Promise<{name: string, noCoures: number, _id: string, isBlock: boolean}> => {
    const response = await api.patch(`/admin/updateCatagory/${id}`, data);
    console.log("response.data from api", response.data);
    return response.data;
};

export const toggleCategoryBlockApi = async (id: string, status: boolean): Promise<{name: string, noCoures: number, _id: string, isBlock: boolean}> => {
    const response = await api.patch(`/admin/catagory/${id}/changeStatus`, { status });
    console.log("id", response.data);
    return response.data;
};
interface courses {
    courses: courses[];
}

export const listAllCoursesApi = async (): Promise<courses> => {
    const response = await api.get('/admin/listAllCourses');
    response.data.total=10
    console.log(response.data);
    
    return response.data;
};

export const verifyCourseApi = async (id: string, status: boolean): Promise<{message: string, status: boolean,result:CourseData[]}> => {
    const response = await api.patch(`/admin/course/${id}/changeStatus`, { status });
    console.log(response.data);
    
    return response.data;
};
