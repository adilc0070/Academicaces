import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    email: "",
    password: "",
};

const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {
        setInstructorDetails: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setInstructorLogOut: (state) => {
            state.userName = "";
            state.email = "";
            state.password = "";
        },
    },
});



export const { setInstructorDetails, setInstructorLogOut } = instructorSlice.actions;
export default instructorSlice.reducer;
