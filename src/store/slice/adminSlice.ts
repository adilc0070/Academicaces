import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email:'',
    password:'',
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setAdminLogOut: (state) => {
            state.email = '';
            state.password = '';
        },
    },
});



export const { setAdminDetails, setAdminLogOut } = adminSlice.actions;
export default adminSlice.reducer