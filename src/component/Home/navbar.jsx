import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { url } from "../URL/url";
// import Logo from "../Files/company-portal/logo-on-christmas.png";
//import Logo from "../Files/company-portal/infoEthiopiaLogo.png";
import axios from "axios";
import {
  InputAdornment,
  Popover,
  TextField,
  useMediaQuery,
} from "@mui/material";
import queryString from "query-string";

import { Image } from "react-bootstrap";
import { signout, isAuth } from "../Authentication/auth";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import { useLocation } from "react-router-dom";

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "rgb(20, 61, 89)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
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

function Navbar(props) {
  const history = useHistory();

  const [companies, setCompanies] = useState([]);

  const [hideSearchBar, sethideSearchBar] = useState(true);
  const [fetching, setFetching] = React.useState(false);
  window.addEventListener("scroll", () => {
    if (history.location.pathname === "/") {
      if (window.scrollY > 250) {
        sethideSearchBar(false);
      } else {
        sethideSearchBar(true);
      }
    }
  });

  const [Q, setQ] = useState("");
  useEffect(() => {
    setQ("");
    if (history.location.pathname == "/") {
      sethideSearchBar(true);
    } else {
      sethideSearchBar(false);
    }
  }, [history.location.pathname]);
  React.useEffect(() => {
    let Timer;
    clearTimeout(Timer);
    setFetching(true);
    Timer = setTimeout(async () => {
      handleSearch();
    }, 1000);
    return () => {
      clearTimeout(Timer);
    };
  }, [Q]);
  const handleSearch = () => {
    axios
      .get(
        `${url}api/search-companies-by-name/name?${queryString.stringify({
          search: Q,
        })}`
      )
      .then((response) => {
        let index = response.data.result
          .map((o) => [o["name"], o])
          .sort(([a], [b]) => (a > b) - (a < b));

        setCompanies(index);
        setFetching(false);
      });
  };
  const matches = useMediaQuery("(min-width:852px)");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleSearch = (rows) => {
  //   return rows.filter((row) =>
  //     row.name.toLowerCase().trim().startsWith(Q.toLowerCase().trim())
  //   );
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
      open={isMenuOpen}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {isAuth() && (
        <MenuItem
          key="1"
          onClick={() => {
            history.push("/profile");
          }}
        >
          Profile
        </MenuItem>
      )}

      {isAuth() && (
        <MenuItem
          key="2"
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}
        >
          Logout
        </MenuItem>
      )}
      {!isAuth() && (
        <MenuItem
          key="3"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </MenuItem>
      )}
    </Popover>
  );

  return (
    <div className="nav">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} position="static" className="appbar">
          <Toolbar>
            {!matches && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.navClick}
              >
                <MenuIcon />
              </IconButton>
            )}
            {matches && (
              <Image
                onClick={() => history.push("/")}
             //   src={Logo}
                fluid
                style={{
                  // width: "80px",
                  height: "80px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            )}

            {!hideSearchBar && (
              <div className="searchBar">
                <form autoComplete="off">
                  <StyledInputBase
                    type="search"
                    variant="outlined"
                    label="Search Companies"
                    className="searchInput"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ManageSearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={Q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </form>
                {/* </Search> */}
              </div>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={"navbarMenu"}>
                  <div className="navbarMenuList">
                    <span
                      className="cursor navList"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Home
                    </span>

                    <span
                      className="cursor navList"
                      onClick={() => {
                        history.push("/aboutus");
                      }}
                    >
                      About
                    </span>
                    <span
                      className="cursor navList"
                      onClick={() => {
                        history.push("/catagories");
                      }}
                    >
                      Catagories
                    </span>
                  </div>
                </div>
                {matches && (
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                )}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {!hideSearchBar && (
          <div className="holder">
            {Q !== "" && !fetching && (
              <div className="search__result__holder ">
                {companies.length == 0 ? (
                  <div className="no__record">
                    No record <DoNotDisturbAltIcon />
                  </div>
                ) : (
                  companies.map((company, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/${company[1].slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="search__results">
                          <Typography variant="h6">
                            {" "}
                            {company[1].name.charAt(0).toUpperCase() +
                              company[1].name.slice(1)}
                          </Typography>
                          <div style={{ color: "rgba(244,151,3,.8)" }}>
                            {" "}
                            <span>Catagory :- </span>
                            {company[1].Catagory?.name.charAt(0).toUpperCase() +
                              company[1].Catagory?.name.slice(1)}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}
      </Box>
    </div>
  );
}
export default withRouter(Navbar);
