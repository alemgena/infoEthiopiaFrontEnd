import React from "react";
import CompanyForm from "./Utiles/CompanyForm";

const RegisterCompanyComponent = ({companies}) => {
  return (
    <div>
      <CompanyForm />
      {/* <UpdateCompanyForm companies={companies} /> */}
    </div>
  );
};

export default RegisterCompanyComponent;
