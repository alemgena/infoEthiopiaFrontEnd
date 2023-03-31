import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MapIcon from "@mui/icons-material/Map";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import emailjs from "emailjs-com";
import { Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Controls from "../controls/Controls";
import { Form } from "../customHelpers/useForm";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const StyledInputBase = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  label: {
    color: "white",
  },
  input: {
    color: "white",
  },
}));
export default function Footer() {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
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
    <footer className="footer">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className=" about">
              <h5 className=" col_white_amrc pt2">Find Us</h5>

              <p className="mb10">
                infoethiopia is a free website and application-based system that
                provide companies info, detail, and address-based in Ethiopia.
              </p>
              <p>
                <MapIcon />
                Ethiopia, Addis ababa, megenagna 24 next to kokeb hall
              </p>
              <p>
                <LocalPhoneIcon />
                +251925002580 / +251943141717
              </p>
              <p>
                <MailOutlineIcon /> contact@infoethiopia.net
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <>
              {" "}
              <h5 className="headin5_amrc col_white_amrc pt2">Follow Us</h5>
              <ul className="footer_ul2_amrc">
                <li>
                  <p>
                    <a href="https://facebook.com/InfoEthiopia-106179601909035">
                      <FacebookIcon />
                      facebook
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/infoethiopia"
                    >
                      <LinkedInIcon /> Linkedin
                    </a>
                  </p>
                </li>
              </ul>
            </>
            <>
              <h5 className="headin5_amrc col_white_amrc pt2">Quick Links</h5>
              <ul className="footer_ul_amrc">
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/catagories">Catagories</Link>
                </li>
                <li>
                  <Link to="/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/registercompany">Register Company</Link>
                </li>
              </ul>
            </>
          </Grid>
          <Grid item sm={12} md={4}>
            <h5 className="headin5_amrc col_white_amrc pt2">Contact Us</h5>
            <Form onSubmit={sendEmail}>
              <StyledInputBase
                label="Email"
                name="user_email"
                type="email"
                value={values.user_email}
                onChange={handleInputChange}
                required
                variant="outlined"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
              />

              <StyledInputBase
                label="Name"
                name="user_name"
                value={values.user_name}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
              />
              <StyledInputBase
                label="Message"
                placeholder="write something"
                name="message"
                multiline
                value={values.message}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
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
                  color="rgba(244,151,3,.8)"
                />
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <div
        style={{
          paddingTop: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="button">
          Copyright @{new Date().getFullYear()} RCNDC. All rights reserved
        </Typography>
      </div>
    </footer>
  );
}
