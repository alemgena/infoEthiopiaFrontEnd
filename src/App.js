import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./component/User/css/app.css";
import { useMediaQuery } from "@mui/material";
import EditProfile from "./component/User/editProfile";
import Login from "./component/login";
import Home from "./component/Home/home_page";
import Aboutus from "./component/Utiles/Aboutus";
import DetailNews from "./component/Home/ViewNews";
import Contact from "./component/Utiles/Contact";
import Company from "./component/categories/Company";
import Profile from "./component/User/Card";
import { Helmet } from "react-helmet-async";
import Register from "./component/register";
import Categories from "./component/categories/Categories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Allnews from "./component/Utiles/Allnews";
import RegisterCompany from "./component/Company/RegisterCompany";
import UpdateCompanyForm from "./component/Utiles/UpdateCompanyForm";
import NewsFormComponent from "./component/Utiles/NewsFormComponent";
import PageNotFound from "./component/404";
import FilterCompany from "./component/Company/FilterCompany";
import CompanyPage from "./component/Company/CompanyPage";
export default function App() {
  useEffect(() => {
    localStorage.removeItem("company");
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Helmet>
            <link rel="canonical" href="/" />
            <title>Home - Info Ethiopia</title>
            <meta
              name="description"
              content="Visit Info Ethiopia to check and get informations about buisness companies that are registered in our platform."
            />
            {/* <lina property="og:title" content="Home - Info Ethiopia" /> */}
          </Helmet>
          <Home />
        </Route>
        <Route exact path="/login">
          <Helmet>
            <title>Login - Info Ethiopia</title>
            <meta name="description" content="Login to Info Ethiopia." />
            <link rel="canonical" href="/login" />
          </Helmet>
          <Login />
        </Route>
        <Route exact path="/register">
          <Helmet>
            <title>Register - Info Ethiopia</title>
            <meta name="description" content="Register for Info Ethiopia" />

            <link rel="canonical" href="https://infoethiopia.net/register" />
            <meta property="og:title" content="Register - Info Ethiopia" />
            <meta
              property="og:description"
              content="Register for Info Ethiopia."
            />
            <meta property="article:section" content="Register" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/register"
            />
          </Helmet>
          <Register />
        </Route>
        <Route path="/catagories">
          <Helmet>
            <meta
              name="google-site-verification"
              content="bKC-8TU0CaISCm80qkd3sxIrdtTN-6_w9TI2CJtQ8us"
            />

            <title>Catagories - Info Ethiopia</title>

            <meta name="description" content="view all catagories." />

            <link rel="canonical" href="https://infoethiopia.net/catagories" />
            <meta property="og:title" content="Register - Info Ethiopia" />
            <meta property="og:description" content="view all catagories." />
            <meta property="article:section" content="Catagories" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/catagories"
            />
          </Helmet>
          <Categories />
        </Route>
        <Route path="/news/:title">
          <Helmet>
            <meta charSet="utf-8" />
            <title>News - Info Ethiopia</title>
            <meta
              name="description"
              content="Visit Info ethiopia News for entertainment, business, science, technology and health news."
            />

            <link
              rel="canonical"
              href={`https://infoethiopia.net/news/title`}
            />
            <meta property="og:title" content="News - Info Ethiopia" />
            <meta
              property="og:description"
              content="Visit Info ethiopia News for entertainment, business, science, technology and health news."
            />
            <meta property="article:section" content="News" />
            <meta
              property="og:url"
              content={`https://infoethiopia.net/news/title`}
            />
          </Helmet>
          <DetailNews />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/aboutus">
          <Helmet>
            <title>About Us - Info Ethiopia</title>

            <meta name="description" content="About Us Info Ethiopia." />

            <link rel="canonical" href="https://infoethiopia.net/aboutus" />
            <meta property="og:title" content="About Us - Info Ethiopia" />
            <meta property="og:description" content="About Info Ethiopia." />
            <meta property="article:section" content="About Us" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/aboutus"
            />
          </Helmet>
          <Aboutus />
        </Route>
        <Route path="/companies">
          <Helmet>
            <title>Companies Detail - Info Ethiopia</title>

            <meta
              name="description"
              content="View all companies that are registered on the info ethiopia platform."
            />
            <link rel="canonical" href="https://infoethiopia.net/companies" />
            <meta property="og:title" content="Companies - Info Ethiopia" />
            <meta
              property="og:description"
              content="View all companies that are registered on the info ethiopia platform."
            />
            <meta property="article:section" content="Companies" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/companies"
            />
          </Helmet>
          <Company />
        </Route>
        <Route exact path="/profile">
          <Helmet>
            <title>Profile - Info Ethiopia</title>

            <meta name="description" content="View your profile." />
            <link rel="canonical" href="https://infoethiopia.net/profile" />
            <meta property="og:title" content="Profile - Info Ethiopia" />
            <meta property="og:description" content="View your profile." />
            <meta property="article:section" content="Profile" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/profile"
            />
          </Helmet>
          <Profile />
        </Route>
        <Route exact path="/editProfile">
          <Helmet>
            <title>Edit Profile - Info Ethiopia</title>

            <meta name="description" content="Edit your profile." />
            <link rel="canonical" href="https://infoethiopia.net/editProfile" />
            <meta property="og:title" content="Edit Profile - Info Ethiopia" />
            <meta property="og:description" content="Edit your profile." />
            <meta property="article:section" content="Edit Profile" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/editProfile"
            />
          </Helmet>
          <EditProfile />
        </Route>
        <Route exact path="/news">
          <Helmet>
            <title>News - Info Ethiopia</title>
            <meta
              name="description"
              content="Visit Info ethiopia News for entertainment, business, science, technology and health news."
            />

            <link rel="canonical" href="https://infoethiopia.net/news" />
            <meta property="og:title" content="News - Info Ethiopia" />
            <meta
              property="og:description"
              content="Visit Info ethiopia News for entertainment, business, science, technology and health news."
            />
            <meta property="article:section" content="News" />
            <meta property="og:url" content="https://infoethiopia.net/news" />
          </Helmet>
          <Allnews />
        </Route>
        <Route exact path="/registercompany">
          <Helmet>
            <title>Register company - Info Ethiopia</title>
            <meta name="description" content="Register your company." />

            <link
              rel="canonical"
              href="https://infoethiopia.net/registercompany"
            />
            <meta
              property="og:title"
              content="Register company - Info Ethiopia"
            />
            <meta property="og:description" content="Register your company." />
            <meta property="article:section" content="Register Company" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/registercompany"
            />
          </Helmet>
          <RegisterCompany />
        </Route>
        <Route exact path="/updatecompany">
          <Helmet>
            <title>Register company - Info Ethiopia</title>
            <meta name="description" content="Register your company." />

            <link
              rel="canonical"
              href="https://infoethiopia.net/updatecompany"
            />
            <meta
              property="og:title"
              content="Update company - Info Ethiopia"
            />
            <meta property="og:description" content="Update your company." />
            <meta property="article:section" content="Update Company" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/updatecompany"
            />
          </Helmet>
          <UpdateCompanyForm />
        </Route>
        <Route exact path="/addnews">
          <Helmet>
            <title>Add News - Info Ethiopia</title>
            <meta name="description" content="Add news about your company." />

            <link rel="canonical" href="https://infoethiopia.net/addnews" />
            <meta property="og:title" content="Add News - Info Ethiopia" />
            <meta
              property="og:description"
              content="Add news about your company."
            />
            <meta property="article:section" content="Add news" />
            <meta
              property="og:url"
              content="https://infoethiopia.net/addnews"
            />
          </Helmet>
          <NewsFormComponent />
        </Route>
        {/* <Route exact path="/filter-company" component={FilterCompany} />{" "} */}
        <Route exact path="/:name">
          <Helmet>
            <title>Companies Detail - Info Ethiopia</title>

            <meta
              name="description"
              content="Companies Detail - Info Ethiopia."
            />

            <meta
              property="og:title"
              content="Companies Detail - Info Ethiopia"
            />
            <meta
              property="og:description"
              content="Companies Detail - Info Ethiopia."
            />
            <meta property="article:section" content="Companies Details" />
          </Helmet>
          <CompanyPage />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
