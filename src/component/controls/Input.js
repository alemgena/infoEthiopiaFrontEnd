import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "rgb(20, 61, 89)",

  borderRadius: "15px",
  outline: "none",
  "& .MuiInputBase-input": {
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  "& label.Mui-focused": {
    color: "rgb(20, 61, 89)",
  },
  "& .MuiOutlinedInput-root": {
    " &.Mui-focused fieldset": {
      borderColor: "rgb(20, 61, 89)",
    },
  },
}));
export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    type,
    autoFocus,
    ...other
  } = props;

  return (
    <StyledInputBase
      variant="outlined"
      label={label}
      name={name}
      value={value}
      type={type || "text"}
      onChange={onChange}
      autoFocus={autoFocus}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
