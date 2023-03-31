import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
export const CategoryIdSlice = createSlice({
    name:'CategoryId',
    initialState: {
        id:null,
    },
    reducers: {
       InsertId:(state,action) => {
        state.id = action.payload;
       },
       RemoveId:(state,action) => {
        state.user =null;
       },
    }
});