import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { DrawerSlice } from "../Slices/Drawer";
import { signout, isAuth } from "../Authentication/auth";
import { Image } from "react-bootstrap";
// import Logo from "../Files/company-portal/logo-on-christmas.png";
//import Logo from "../Files/company-portal/infoEthiopiaLogo2.png";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export default function LeftDrawer(props) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const showDrawer = useSelector((state) => state.Drawer.isOpen);
  const [state, setState] = React.useState({
    left: false,
  });
  const actions = DrawerSlice.actions;

  const closeDrawer = () => {
    dispatch(actions.hideDrawer());
    document.body.style.overflow = "visible";
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {" "}
      <div className="DrawerList">
        <div
          className="imageHolder"
          onClick={() => {
            props.setNavToggle(false);
            history.push("/");
          }}
        >
          <Image
            src={Logo}
            fluid
            className="ImageLogo"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div className="mainlistHolder">
          <div className="maintitle">
            {/* <div className="title"> */}
            <div
              className="drawerLink"
              onClick={() => {
                props.setNavToggle(false);
                history.push("/catagories");
              }}
            >
              <MenuIcon size="large" />
              Categories
            </div>
            {/* <Divider /> */}

            <div
              onClick={() => {
                props.setNavToggle(false);
                history.push("/registercompany");
              }}
              className="drawerLink"
            >
              <ApartmentIcon />
              Register company
            </div>
            <div
              onClick={() => {
                props.setNavToggle(false);
                history.push("/updatecompany");
              }}
              className="drawerLink"
            >
              <ApartmentIcon />
              update company
            </div>
            <div
              onClick={() => {
                props.setNavToggle(false);
                history.push("/addnews");
              }}
              className="drawerLink"
            >
              <NewspaperIcon />
              add news
            </div>

            {isAuth() && (
              <div
                onClick={() => {
                  props.setNavToggle(false);
                  history.push("/profile");
                }}
                className="drawerLink"
              >
                <AccountCircle />
                profile
              </div>
            )}
            {/* </div> */}
            {/* </div> */}
            {/* <Divider /> */}
            <div className="Contact">
              <div
                className="drawerLink"
                onClick={() => {
                  props.setNavToggle(false);
                  history.push("/contact");
                }}
              >
                <ContactPhoneIcon />
                Contact
              </div>
            </div>
            {/* <Divider /> */}
            {/* <div className="DrawerFooter"> */}
            <div
              className="drawerLink"
              onClick={() => {
                props.setNavToggle(false);
                history.push("/aboutus");
              }}
            >
              <InfoIcon />
              About us
            </div>
            {/* <Divider /> */}

            {!isAuth() && (
              <div
                onClick={() => {
                  props.setNavToggle(false);
                  history.push("/login");
                }}
                className="drawerLink"
              >
                <LogoutIcon />
                Login
              </div>
            )}
            {isAuth() && (
              <div
                onClick={() => {
                  props.setNavToggle(false);
                  signout(() => {
                    history.push("/");
                  });
                }}
                className="drawerLink"
              >
                <LogoutIcon className />
                Logout
              </div>
            )}

            {/* <Divider /> */}
          </div>
          <span className="contactus">
            {" "}
            <a
              target="_blank"
              href="https://www.facebook.com/InfoEthiopia-106179601909035/"
            >
              <FacebookIcon fontSize="large" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/infoethiopia"
            >
              <LinkedInIcon fontSize="large" />
            </a>
          </span>
          <span className="copyright">
            {/* Copyright @2017 | Designed With by <Link to="#">Your Company Name</Link>© */}
            Copyright @2021 RCNDC. All rights reserved
          </span>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={props.navToggle}
            onClose={() => {
              props.setNavToggle(false);
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
