import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
export const FetchDataSlice = createSlice({
    name:'DataSlice',
    initialState: {
        data:{},
        company:{}
    },
    reducers: {
       InsertData:(state,action) => {
        state.data = action.payload;
       },
       RemoveData:(state,action) => {
        state.data ={};
       },
       InsertCompany:(state,action) => {
        state.company = action.payload;
       },
       RemoveCompany:(state,action) => {
        state.company ={};
       },
    }
});