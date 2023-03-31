import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { EditProfileSlice } from "./Slices/editProfile";
import PersonIcon from "../Files/company-portal/profile.png";
import { url } from "./URL/url";
import { config, header } from "./URL/header";
import axios from "axios";
import { Menu, MenuItem, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from "@mui/icons-material/Edit";

const Card = (props) => {
  const [showForgotPassword, setshowForgotPassword] = useState(false);

  return (
    <div className="card__container">
      {showForgotPassword && <VerificationInput />}
      <Dialog open={false}>
        <div className="icon">
          <div className="closeIcon">
            <CloseIcon
              onClick={() => {
                setShow(false);
                history.push("/");
              }}
            />
          </div>
        </div>

        <div className="flex justify-center align-center"></div>
        <div className="FormHolder">
          <form onSubmit={submitVerficationCode}>
            <Controls.Input
              label="Email"
              required
              value={email}
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
                setEmail(e.target.value);
              }}
              error={errors.email}
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
            <button
              className="button"
              type="submit"
              style={{
                marginTop: "3vh",
                marginBottom: "3vh",
                marginLeft: "34%",
              }}
            >
              Send
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Card;
