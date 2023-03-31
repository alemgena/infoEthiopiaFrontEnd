import { Typography } from "@mui/material";
import RegisterCompanyComponent from "../RegisterCompanyComponent";
import Layout from "../Layout";
const RegisterCompany = () => {
  return (
    <Layout>
      <div className="register__company">
        <Typography variant="h6" className="page-header">
          Register company
        </Typography>
        <RegisterCompanyComponent />
      </div>
    </Layout>
  );
};

export default RegisterCompany;
