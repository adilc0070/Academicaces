import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudentDetails: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setStudentLogOut: (state) => {
            state.userName = "";
            state.email = "";
            state.password = "";
    
        }
    }
});

export const { setStudentLogOut, setStudentDetails } = studentSlice.actions;
export default studentSlice.reducer