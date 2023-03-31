import React, { createRef } from "react";
import { useLocation } from "react-router-dom";
import Topnav from "../companyPageComponents/topnav/TopNav";
import Landing from "../companyPageComponents/landing/Landing";
import About from "../companyPageComponents/about/About";
//import ContactUs from "../companyPageComponents/ContactUs/ContactUs";
import Service from "../companyPageComponents/Services/Service";
import Blogs from "../companyPageComponents/blogs/Blogs";
import axios from "axios";
import { url } from "../URL/url";
import { CircularProgress, Typography } from "@mui/material";

const CompanyPage = () => {
  const IndexRef = createRef();
  const AboutRef = createRef();
  const ServiceRef = createRef();
  const ContactUsRef = createRef();
  const NewsRef = createRef();
  const [CompanyInfo, setCompanyInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
   
    const value = location.pathname.split("/").filter((x) => x)[
      location.pathname.split("/").filter((x) => x).length - 1
    ];
     console.log(value);
    setLoading(true);
    axios.get(`${url}api/search-company/${value}`).then((response) => {
      if (response.data.result) setCompanyInfo(response.data.result);
      if (response.data.result == null) setNotFound(true);
      setLoading(false);
    });
  }, [location]);
  React.useEffect(() => {
    window.scrollTo({
      top: 0, //add your necessary value
      behavior: "smooth", //Smooth transition to roll
    });
  }, []);
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 70, //add your necessary value
        behavior: "smooth", //Smooth transition to roll
      });
    }
  };

  return (
    <div className="detail__page">
      {notFound ? (
        <div className="load">
          <Typography variant="h5" color="body2">
            Company not found, check your link.
          </Typography>
        </div>
      ) : !loading && Object.keys(CompanyInfo).length !== 0 ? (
        <>
          <Topnav
            companyLogo={CompanyInfo.logo}
            name={CompanyInfo.name}
            // IndexRef={IndexRef}
            ContactUsRef={ContactUsRef}
            ServiceRef={ServiceRef}
            NewsRef={NewsRef}
            AboutRef={AboutRef}
            scrollTo={scrollTo}
            Newslength={CompanyInfo.News.length > 0}
          />

          {/* <Landing IndexRef={IndexRef} /> */}
          <Service ServiceRef={ServiceRef} Services={CompanyInfo.Services} />
          <About AboutRef={AboutRef} about={CompanyInfo.description} />
          <ContactUs ContactUsRef={ContactUsRef} CompanyInfo={CompanyInfo} />
          <Blogs NewsRef={NewsRef} News={CompanyInfo.News} />
        </>
      ) : (
        <div className="load">
          <CircularProgress size={100} thickness={2} />
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
