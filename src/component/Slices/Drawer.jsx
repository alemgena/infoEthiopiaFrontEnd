import { createSlice } from "@reduxjs/toolkit";

export const DrawerSlice = createSlice({
    name:'leftDrawer',
    initialState: {
        isOpen:false,
    },
    reducers: {
       showDrawer:(state) => {
           state.isOpen = true;
       },
       hideDrawer:(state) => {
           state.isOpen = false;
       },
       
    }
});