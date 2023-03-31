import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { EditProfileSlice } from "../Slices/editProfile";
//import PersonIcon from "../Files/company-portal/profile.png";
import { url } from "../URL/url";
import { config, header } from "../URL/header";
import axios from "axios";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MapIcon from "@mui/icons-material/Map";
import Layout from "../Layout";
const Card = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const actions = EditProfileSlice.actions;
  const hiddenFileInput = React.useRef(null);
  const [user, setUser] = useState({});

  return (
    <Layout>
      <div className="card__container">
        <div className="card about">
          <Typography variant="h6" className="page-header">
            About Us
          </Typography>{" "}
          <div className="">
            <p className="mb10">
              infoethiopia is a free website and application-based system that
              provide companies info, detail, and address-based in Ethiopia.
            </p>
            <p>
              <MapIcon /> Ethiopia, Addis ababa, megenagna 24 next to kokeb hall
            </p>
            <p>
              <LocalPhoneIcon /> +251925002580 / +251943141717
            </p>
            <p>
              <MailOutlineIcon /> contact@infoethiopia.net
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Card;
