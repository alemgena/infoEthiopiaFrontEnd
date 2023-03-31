import profileIcon from "../Files/company-portal/profile.png";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
const Profile = () => {
  const mobileView = useMediaQuery({ query: "(max-width: 576px)" });

  //   const user = useSelector((state) => state.login.loggedUser);

  return (
    <div className="profile">
      <div className="image">
        <img src={profileIcon} alt="" />
      </div>
      <div className="delete-photo">
        <div className="profile-btn">Delete Photo"</div>
      </div>
      <div className="name">user.firstName user.lastName</div>
      <div className="edit-profile edit-profile-mobile">
        {" "}
        <div className="profile-btn">Edit Profile"</div>
        <div className="profile-btn">Change Password</div>
      </div>

      <div className="contact-list contact-list-mobile">
        <div className="contact-item">
          <div className="icon">icon</div>
          <div className="text">phone</div>
        </div>
        <div className="contact-item">
          <div className="icon">emailIcon</div>
          <div className="text">email</div>
        </div>
        <div className="contact-item">
          <div className="icon">addressIcon</div>
          <div className="text">address</div>
        </div>
      </div>
      {/* <div className="dashboard">
        <Row>
          <Col md={8}>
            <History historyData={historyData} />
          </Col>
          <Col md={4}>
            <Cart />
            <Wishlist />
          </Col>
        </Row>
      </div> */}
    </div>
  );
};
export default Profile;
