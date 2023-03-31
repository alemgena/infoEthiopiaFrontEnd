import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { url } from "./URL/url";
import { useDispatch } from "react-redux";
import { userProfileSlice } from "./Slices/user";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { authentication, isAuth } from "./Authentication/auth";
import Controls from "./controls/Controls";
// import logo from "./Files/company-portal/logo-on-christmas.png";
import logo from "./Files/company-portal/infoEthiopiaLogo2.png";
import { useForm, Form } from "./customHelpers/useForm";
import { Typography, useMediaQuery } from "@mui/material";
import PopupWithOutClose from "./customHelpers/PopupWithOutClose";
import Popup from "./customHelpers/Popup";
import Alert from "./customHelpers/Alert";
import Register from "./register";
import Layout from "./Layout";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "40%",
    maxWidth: "40%",
  },
  logging: {
    marginLeft: "10px",
  },
}));
const initialFValues = {
  username: "",
  password: "",
};
const SigninComponent = (props) => {
  const dispatch = useDispatch();
  const actions = userProfileSlice.actions;
  const matches = useMediaQuery("(min-width:768px)");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showpasswordrecovery, setshowpasswordrecovery] = useState(false);
  const [recovery, setrecovery] = useState({
    err: "",
    message: "",
    value: "",
  });

  const [response, setResponse] = useState({
    loading: false,
    data: "",
    err: "",
  });
  const { loading, err } = response;
  const classes = useStyles();
  const { history } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length != 0 ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length != 0 ? "" : "This field is required.";
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
      setResponse({ ...response, loading: true, err: false });
      axios
        .post(`${url}api/signin`, {
          ...values,
        })
        .then((response) => {
          const data = response.data;
          if (data.err) {
            setResponse({ ...response, err: data.err, loading: false });
          } else {
            if (data.user && data.token) {
              authentication(data, () => {
                if (isAuth()) {
                  dispatch(actions.setUser(data.user));
                  history.push("/");
                }
              });
            } else {
              setResponse({
                ...response,
                err: "Something's not right.",
                loading: false,
              });
            }
          }
        });
    }
  };
  const submitPasswordRecoveryForm = (e) => {
    e.preventDefault();
    setrecovery({ ...recovery, err: "", message: "" });
    axios
      .put(`${url}api/forgot-password`, {
        email: recovery.value,
      })
      .then((response) => {
        if (response) {
          const data = response.data;

          if (data.err) {
            setrecovery({ ...recovery, err: data.err });
          } else {
            setrecovery({ ...recovery, message: data.message });
          }
        }
      });
  };
  return (
    <>
    <Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PopupWithOutClose pathname="/" maxWidth="xs">
        <div className={matches ? "FormHolderDesktop" : "FormHolder"}>
          <div className="Logo">
            <img src={logo} className={classes.image} />
          </div>
          <div className="mb-8 ">
            <Typography variant="h5" color="rgba(244,151,3,.8)">
              Login
            </Typography>
            Signin to your account
          </div>
          {history.location.state && (
            <Alert severity="error">{history.location.state}</Alert>
          )}
          {err && <Alert severity="error">{err}</Alert>}
          <Form onSubmit={HandleSubmit}>
            <Controls.Input
              label="Username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Controls.Input
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <Controls.Button
              color="rgba(244,151,3,.8)"
              type="submit"
              text={
                <>
                  Login
                  {loading && (
                    <CircularProgress
                      size="15px"
                      color="secondary"
                      className={classes.logging}
                    />
                  )}
                </>
              }
            />
          </Form>
          <div className="bottomForm">
            <div
              onClick={() => {
                setShowRegistrationForm(true);
              }}
            >
              Sign up
            </div>
            <div
              onClick={() => {
                setshowpasswordrecovery(true);
              }}
            >
              Forgot Password?
            </div>
          </div>
        </div>
      </PopupWithOutClose>

      <Popup
        title="Forget password Form."
        openPopup={showpasswordrecovery}
        setOpenPopup={setshowpasswordrecovery}
      >
        <div>
          <div className="mb-8 ">
            <Typography variant="h5" color="rgba(244,151,3,.8)">
              Enter your email.
            </Typography>
          </div>
          {recovery.err && <Alert severity="error">{recovery.err}</Alert>}
          {recovery.message && (
            <Alert severity="info">{recovery.message}</Alert>
          )}
          <Form onSubmit={submitPasswordRecoveryForm}>
            <Controls.Input
              label="Email"
              required
              value={recovery.value}
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
              onChange={(e) => {
                setrecovery({ ...recovery, value: e.target.value });
              }}
              error={errors.email}
            />
            <Controls.Button
              color="rgba(244,151,3,.8)"
              type="submit"
              text="Submit"
            />
          </Form>
        </div>
      </Popup>
      <Popup
        title="Registration Form."
        openPopup={showRegistrationForm}
        setOpenPopup={setShowRegistrationForm}
        maxWidth="sm"
      >
        <Register
          signup={true}
          setShowRegistrationForm={setShowRegistrationForm}
        />
      </Popup>
    </Layout>
    </>
  );
};

export default withRouter(SigninComponent);
