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
        setUserDetails: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setLogOut: (state) => {
            state.userName = "";
            state.email = "";
            state.password = "";
    
        }
    }
});

export const { setUserDetails, setLogOut } = studentSlice.actions;
export default studentSlice.reducer