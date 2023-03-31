import { Typography } from "@mui/material";
import ContactUsComponent from "../ContactUsComponent";
import { Helmet } from "react-helmet-async";
import Layout from "../Layout";
const Card = (props) => {
  return (
    <>
    <Helmet>
      <title>Contact - Info Ethiopia</title>
      <meta name="description" content="Contact Info Ethiopia." />
      <link rel="canonical" href="/contact" />
       </Helmet>
      <Layout>
        <div className="register__company">
          <Typography variant="h6" className="page-header">
            Contact Us
          </Typography>
          <ContactUsComponent />
        </div>
      </Layout>
      </>
   
  );
};

export default Card;
