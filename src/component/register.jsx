import React, { useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { authentication, isAuth } from "./Authentication/auth";
import { url } from "./URL/url";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";
import Controls from "./controls/Controls";
// import logo from "./Files/company-portal/logo-on-christmas.png";
import logo from "./Files/company-portal/infoEthiopiaLogo2.png";
import { Form, useForm } from "./customHelpers/useForm";
import { Grid } from "@mui/material";
import Popup from "./customHelpers/Popup";
import Layout from "./Layout";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "25%",
    maxWidth: "25%",
  },
}));
const initialFValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phone_no: "",
  password: "",
};
const SignupComponent = (props) => {
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(true);
  const [activationErr, setAcrivationErr] = useState("");
  const matches = useMediaQuery("(min-width:768px)");
  const [showVerfication, setShowVerfication] = useState(false);
  const [response, setResponse] = useState({
    data: "",
    err: "",
  });
  const { data, err } = response;
  const classes = useStyles();
  const [verficationCode, setVcode] = useState();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 6 ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = regexEmail.test(fieldValues.email.toString().toLowerCase())
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setloading(true);
      setResponse({ ...response, err: "" });

      axios
        .post(`${url}api/pre-signup`, {
          ...values,
        })
        .then((response) => {
          setloading(true);
          if (response) {
            if (response.data.message) {
              setShowVerfication(true);
              setShow(false);
            } else {
              setResponse({ ...response, err: response.data.err });
            }
          }
        });
    }
  };
  const submitVerficationCode = (e) => {
    e.preventDefault();
    setloading(true);
    setAcrivationErr("");
    axios
      .post(`${url}api/signup`, {
        code: verficationCode,
        email: values.email,
      })
      .then((response) => {
        if (response) {
          const data = response.data;
          setloading(false);
          if (data.err) {
            setAcrivationErr(data.err);
          }
          if (data.user && data.token) {
            authentication(data, () => {
              if (isAuth()) {
                history.push("/");
              }
            });
          }
        }
      });
  };
  return (
    // <Layout>
    <>
      <div
        className={`
        ${props.signup ? "register__card" : "register__company"} ${
          matches ? "FormHolderDesktop" : "FormHolder"
        }
        `}
      >
        {props.signup && (
          <div className="Logo">
            <img src={logo} className={classes.image} />
          </div>
        )}

        {history.location.state && (
          <Alert severity="error">{history.location.state}</Alert>
        )}

        <Form onSubmit={HandleSubmit}>
          {err && <Alert severity="error">{err}</Alert>}
          <Grid container>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="First Name"
                autoFocus={true}
                value={values.firstName}
                name="firstName"
                onChange={handleInputChange}
                error={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="Middle Name"
                value={values.middleName}
                name="middleName"
                onChange={handleInputChange}
                error={errors.middleName}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="Last Name"
                value={values.lastName}
                name="lastName"
                onChange={handleInputChange}
                error={errors.lastName}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="Email"
                value={values.email}
                name="email"
                className={classes.fields}
                onChange={handleInputChange}
                error={errors.email}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="Phone number"
                value={values.phone_no}
                name="phone_no"
                onChange={handleInputChange}
                error={errors.phone_no}
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Input
                label="Password"
                value={values.password}
                name="password"
                type="password"
                onChange={handleInputChange}
                error={errors.password}
              />{" "}
            </Grid>

            <Grid item xs={12}>
              <Controls.Button
                color="rgba(244,151,3,.8)"
                type="submit"
                text="Sign Up"
              />
            </Grid>
          </Grid>
          <div className="bottomForm">
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              Have an account?
              <div
                onClick={() => {
                  props.setShowRegistrationForm
                    ? props.setShowRegistrationForm(false)
                    : history.push("/login");
                }}
                style={{ color: "rgba(244,151,3,.8)" }}
              >
                Sign in
              </div>
            </div>
          </div>
        </Form>
      </div>

      <Popup
        openPopup={showVerfication}
        setOpenPopup={setShowVerfication}
        title="Activation Form."
      >
        <div className="FormHolder">
          {activationErr && <Alert severity="error">{activationErr}</Alert>}

          <Form onSubmit={submitVerficationCode}>
            <Controls.Input
              label="Email"
              required
              value={values.email}
              disabled
            />
            <Controls.Input
              label="Verfication Code"
              required
              value={verficationCode}
              name="username"
              className={classes.fields}
              InputLabelProps={{
                style: { color: "rgb(20,61,89)", fontWeight: "bold" },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              onChange={(e) => setVcode(e.target.value)}
            />

            <Controls.Button
              color="rgba(244,151,3,.8)"
              type="submit"
              text="Activate"
            />
          </Form>
        </div>
      </Popup>
    {/* // </Layout> */}
    </>
  );
};

export default withRouter(SignupComponent);
