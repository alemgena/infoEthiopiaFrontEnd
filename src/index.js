import React from "react";
import "./setupTests.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { DrawerSlice } from "./component/Slices/Drawer";
import { EditProfileSlice } from "./component/Slices/editProfile";
import { userProfileSlice } from "./component/Slices/user";
import { FetchDataSlice } from "./component/Slices/data";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import "./scss/Holder.scss";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
// import { render } from "react-snapshot";
import ReactDOM from "react-dom";
import { FetchCompaniesListSlice } from "./component/Slices/companiesList";
const store = configureStore({
  reducer: {
    Drawer: DrawerSlice.reducer,
    EditProfile: EditProfileSlice.reducer,
    Profile: userProfileSlice.reducer,
    Data: FetchDataSlice.reducer,
    // CompaniesList: FetchCompaniesListSlice.reducer,
  },
});

  ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
      
    </HelmetProvider>,
    document.getElementById("root")
  );

reportWebVitals();
