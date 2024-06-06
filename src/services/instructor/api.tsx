
import axios from "axios";




const api = axios.create({
    baseURL: "http://localhost:3000",
});

type data = {
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

export const listCourses = async (data) => {
    console.log("data",data);
    
    const response = await api.post("/instructor/listCourses",{data:data})
    return response.data
}
export const addCourseApi = async (data) => {

    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    const response = await api.post('/instructor/addCourse', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

export const curriculumApi = async (id, data) => {
    console.log("id", id, "data", data);

    // Create a new FormData object
    const formData = new FormData();

    data.forEach((section, index) => {
        formData.append(`sections[${index}][id]`, section.id);
        formData.append(`sections[${index}][name]`, section.name);

        section.lectures.forEach((lecture, lectureIndex) => {
            const lecturePrefix = `sections[${index}][lectures][${lectureIndex}]`;

            formData.append(`${lecturePrefix}[id]`, lecture.id);
            formData.append(`${lecturePrefix}[name]`, lecture.name);
            formData.append(`${lecturePrefix}[notes]`, lecture.notes);
            formData.append(`${lecturePrefix}[description]`, lecture.description);

            if (lecture.file) {

                formData.append(`${lecturePrefix}[file]`, lecture.file);
                formData.append(`${lecturePrefix}[fileName]`, `${lecturePrefix}[file]`);
            }

            if (lecture.video) {
                formData.append(`${lecturePrefix}[video]`, lecture.video);
                formData.append(`${lecturePrefix}[videoName]`, `${lecturePrefix}[video]`);
            }
        });
    });

    try {
        const response = await api.post(`/instructor/${id}/curriculum`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response.data);


        return response.data;
    } catch (error) {
        throw error;
    }
};


