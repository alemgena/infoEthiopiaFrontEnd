import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
export const FetchCompaniesListSlice = createSlice({
  name: "CompaniesListSlice",
  initialState: {
    companiesList: [],
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    FetchCompany: (state, action) => {
  
      state.companiesList = action.payload;
      state.loading = false;
    },
  },
});
