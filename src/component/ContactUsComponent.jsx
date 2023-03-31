import emailjs from "emailjs-com";
import React from "react";
import { Grid, TextField } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Controls from "./controls/Controls";
import { Form, useForm } from "./customHelpers/useForm";
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

const ContactUsComponent = () => {
  const [values, setValues] = React.useState({
    user_email: "",
    user_name: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    setValues({ ...values, sending: true });
    emailjs
      .sendForm(
        "service_9nllat8",
        "template_eif4x76",
        e.target,
        "user_z74Tihmo9o26WkyQEur3g"
      )
      .then(
        (result) => {
          setValues({ ...values, sending: false });
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <Form onSubmit={sendEmail}>
        <StyledInputBase
          label="Email"
          name="user_email"
          type="email"
          value={values.user_email}
          onChange={handleInputChange}
          required
        />
        <StyledInputBase
          label="Name"
          name="user_name"
          value={values.user_name}
          onChange={handleInputChange}
          required
        />
        <StyledInputBase
          label="Message"
          placeholder="write something"
          name="message"
          multiline
          value={values.message}
          onChange={handleInputChange}
          required
        />
        <Grid item xs={12}>
          <Controls.Button
            disabled={values.sending ? true : false}
            text={
              values.sending == undefined || null
                ? "Send"
                : values.sending
                ? "Sending..."
                : "sent"
            }
            variant="contained"
            className="Button"
            type="submit"
          />
        </Grid>
      </Form>
    </div>
  );
};

export default ContactUsComponent;
