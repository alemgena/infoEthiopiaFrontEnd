import { createSlice } from "@reduxjs/toolkit";

export const EditProfileSlice = createSlice({
    name:'EditProfile',
    initialState: {
        isOpen:false,
    },
    reducers: {
       showEditProfile:(state) => {
           state.isOpen = true;
       },
       hideEditProfile:(state) => {
           state.isOpen = false;
       },
       
    }
});