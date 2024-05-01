import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const signInApi= async ({data}) => {
    console.log(data,"datta");
    const response = await api.post("auth/user/signIn", data);
    return response.data;
}

export const signUpApi= async ({data}) => {
    console.log(data,"sign up");
    const response = await api.post("auth/user/signUp", data);
    return response.data;
}

