import React, { useState, useEffect } from "react";
import { adminSignin, authentication, isAuth } from "../../actions/auth";
import { withRouter } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { makeStyles } from "@mui/styles";

import Controls from "../controls/Controls";
import logo from "../../assets/images/logo.png";
import { useForm, Form } from "../customHelpers/useForm";
import {
  Box,
  TextField,
  CardActions,
  Button,
  Card,
  CardActions,
  CardContent,
  InputAdornment,
  Alert,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "solid 1px white",
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  fields: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  image: {
    maxHeight: "50%",
    maxWidth: "50%",
  },
}));
const initialFValues = {
  username: "",
  password: "",
};
const SigninComponent = (props) => {
  const [response, setResponse] = useState({
    loading: false,
    data: "",
    err: "",
  });
  const { data, loading, err } = response;
  const classes = useStyles();
  const { history, location } = props;
  const [loginError, setLoginError] = useState(null);
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
    useForm(initialFValues, true, validate, setLoginError);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const user = { username: values.username, password: values.password };
    setResponse({ ...response, loading: true, err: false });
    if (validate()) {
      if (location.pathname.includes("/admin")) {
        adminSignin(user).then((data) => {
          if (data.err) {
            setResponse({ ...response, err: data.err, loading: false });
          } else {
            authentication(data, () => {
              if (isAuth()) {
                history.push("/dashboard/admin");
              }
            });
          }
        });
      } else {
      }
    }
  };

  // useEffect(() => {
  //   if ((isAuth() && isAuth().role == 1) || isAuth().role == 3)
  //     history.push("/dashboard/admin");
  //   else isAuth() && history.push("/dashboard");
  // }, []);
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="h-screen bg-gray-200 flex justify-center items-center">
          <Card className="max-w-sm">
            <div className="flex justify-center align-center">
              <img src={logo} className={classes.image} />
            </div>
            <CardContent>
              <div className="mb-8 ">
                <Typography variant="h5" color="primary">
                  Login
                </Typography>
                Signin to your account
              </div>
              {history.location.state && (
                <Alert severity="error">{history.location.state}</Alert>
              )}
              {err && <Alert severity="error">{err}</Alert>}

              <form onSubmit={HandleSubmit}>
                <Controls.Input
                  label="Username"
                  value={values.username}
                  name="username"
                  className={classes.fields}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
                  error={errors.username}
                />
                <Controls.Input
                  label="Password"
                  value={values.password}
                  name="password"
                  className={classes.fields}
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
                  error={errors.password}
                />

                <CardActions>
                  <Controls.Button color="primary" type="submit" text="Login" />
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Modal>
  );
};

export default withRouter(SigninComponent);
