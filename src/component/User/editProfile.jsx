import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useMediaQuery } from "@mui/material";
import { url } from "../URL/url";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Controls from "../controls/Controls";
import { getCookie } from "../Authentication/auth";
import { Form, useForm } from "../customHelpers/useForm";
import Layout from "../Layout";
const initialFValues = {
  firstName: "",
  middleName: "",
  middleName: "",
  phone_no: "",
};
const EditProfile = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("(min-width:768px)");
  const [response, setResponse] = useState({
    err: "",
  });
  const { err } = response;

  useEffect(() => {
    setValues(JSON.parse(localStorage.getItem("user")));
  }, []);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName =
        fieldValues.firstName.length != 0 ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName =
        fieldValues.lastName.length != 0 ? "" : "This field is required.";
    if ("middleName" in fieldValues)
      temp.middleName =
        fieldValues.middleName.length != 0 ? "" : "This field is required.";
    if ("phone_no" in fieldValues)
      temp.phone_no =
        fieldValues.phone_no.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const HandleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    };
    if (validate()) {
      setValues({ ...values, submitting: true });

      axios
        .put(`${url}api/update-profile`, { ...values }, config)
        .then((response) => {
          if (response.data.err) {
            setValues({ ...values, submitting: false });

            setResponse({ ...response, err: response.data.err });
          } else {
            setValues({ ...values, submitting: false });

            localStorage.setItem("user", JSON.stringify(response.data.profile));
            props.setOpenPopup(false);
          }
        });
    }
  };

  return (
    <Layout>
      <div className={matches ? "FormHolderDesktop" : "FormHolder"}>
        {history.location.state && (
          <Alert severity="error">{history.location.state}</Alert>
        )}
        {err && <Alert severity="error">{err}</Alert>}

        <Form onSubmit={HandleSubmit}>
          <Controls.Input
            label="First Name"
            value={values.firstName}
            name="firstName"
            onChange={handleInputChange}
            error={errors.firstName}
          />{" "}
          <Controls.Input
            label="Middle Name"
            value={values.middleName}
            name="middleName"
            onChange={handleInputChange}
            error={errors.middleName}
          />
          <Controls.Input
            label="Last Name"
            required
            value={values.lastName}
            name="lastName"
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Controls.Input
            label="Phone number"
            value={values.phone_no}
            name="phone_no"
            onChange={handleInputChange}
            error={errors.phone_no}
          />
          <Controls.Button
            type="submit"
            text={values.submitting ? "Editing" : "Edit"}
            color="rgba(244,151,3,.8)"
          />
        </Form>
      </div>
    </Layout>
  );
};

export default withRouter(EditProfile);
