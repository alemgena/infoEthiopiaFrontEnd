import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

export function useForm(
  initialFValues,
  validateOnChange = false,
  validate,
  setResponse,
  err
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type == "text" || e.target.type == "textarea")
      value = value.trimLeft();
    setValues({
      ...values,
      [name]:
        name == "officeNumber" ||
        name == "phoneNumber" ||
        name == "fax" ||
        name == "phone_no"
          ? value.replace(/[^0-9]+/g, "")
          : e.target.type == "file"
          ? e.target.files[0]
          : value,
    });
    err && setResponse({ err: "" });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues({ ...initialFValues, add: values.add });
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormControl-root": {
      width: "95%",
      margin: "0 16px 16px 0",
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
