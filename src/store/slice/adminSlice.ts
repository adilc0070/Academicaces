import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email:'',
    password:'',
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setLogOut: (state) => {
            state.email = '';
            state.password = '';
        },
    },
});



export const { setUserDetails, setLogOut } = adminSlice.actions;
export default adminSlice.reducer