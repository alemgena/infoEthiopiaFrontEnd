import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { EditProfileSlice } from "../Slices/editProfile";
//import PersonIcon from "../Files/company-portal/profile.png";
import { url } from "../URL/url";
import { getCookie, isAuth } from "../Authentication/auth";
import { config, header } from "../URL/header";
import axios from "axios";
import { Menu, MenuItem, Button, Avatar, Alert } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../customHelpers/Popup";
import EditProfile from "./editProfile";
import Layout from "../Layout";
const Card = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const actions = EditProfileSlice.actions;
  const hiddenFileInput = React.useRef(null);
  const [user, setUser] = useState({});
  const [response, setResponse] = useState({
    loading: false,
    data: "",
    err: "",
  });
  const [openPopup, setOpenPopup] = useState(false);

  const { data, loading, err } = response;
  useEffect(() => {
    !isAuth()
      ? history.push({ pathname: "/login", state: "You need to login first." })
      : setUser(JSON.parse(localStorage.getItem("user")));
  }, [props]);

  const showEditProfile = () => {
    dispatch(actions.showEditProfile());
    document.body.style.overflow = "hidden";
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    };

    const fileUploaded = event.target.files[0];
    let formData = new FormData();

    formData.append("image", fileUploaded);
    axios
      .post(`${url}api/change-profile-picture`, formData, config)
      .then((response) => {
        if (response.data.err) {
          setResponse({ ...response, err: response.data.err });
        } else {
          localStorage.setItem("user", JSON.stringify(response.data.result));
          setUser(JSON.parse(localStorage.getItem("user")));
        }
      });
  };

  return (
    <Layout>
      <div className="card__container">
        {err && <Alert severity="error">{err}</Alert>}
        <div className="card">
          <div className="profile__main">
            <Button
              className="editProfile"
              onClick={() => {
                // history.push("/editProfile");
                setOpenPopup(true);
              }}
            >
              Edit profile
            </Button>
            <div className="avatar">
              <Avatar
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "./images/image-victor.jpg"
                }
                sx={{ width: 150, height: 150 }}
              />
              <EditIcon
                className="cursor"
                onClick={() => {
                  handleClick();
                }}
              />

              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="profile__details">
            <ul className="profile__details__list">
              <li className="followers">
                <div className="number">
                  <LocalPhoneIcon />
                </div>
                <div className="text">{user.phone_no}</div>
              </li>
              <li className="Likes">
                <div className="number">
                  <EmailIcon />
                </div>
                <div className="text">{user.email}</div>
              </li>
            </ul>
          </div>
        </div>
        <Popup
          title="Update Profile Form."
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          maxWidth="sm"
        >
          <EditProfile setOpenPopup={setOpenPopup} />
        </Popup>
      </div>
    </Layout>
  );
};

export default Card;
