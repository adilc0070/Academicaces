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

export const signUpApi = async ({ data }: { data: data }) => {
    console.log('data', data);
    
    const response = await api.post("auth/user/signUp", data);
    return response.data;
}
export const otpSend = async ({ data }: { data: data }) => {
    console.log(data, "otp send");
    const response = await api.post(`auth/user/verifyOtp/`, data)
    return response.data;
}


