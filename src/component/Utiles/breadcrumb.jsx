import React, { useEffect, useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function CustomizedBreadcrumbs(props) {
  const [breadcrumbs, setbreadcrumbs] = useState([]);
  let location = useLocation();
let routes = location.pathname.split("/").filter((x) => x);
  useEffect(() => {
    
    setbreadcrumbs(
      routes.map((path, index) => {
        return {
          name: path,
          routeTo: routes.slice(0, index + 1).join("/"),
        };
      })
    );
  }, [location]);
console.log(routes)
  return location.pathname === "/" ? (
    ""
  ) : (
    <div className="breadcrumb">
      <Breadcrumbs separator={"/"} aria-label="breadcrumb">
        <Link className="breadcrumb-link Button-Link" to={`/`}>
          Home
        </Link>

        {breadcrumbs.map((path, index) => {
          const routeTo = `/${path.routeTo}`;
          path.name = path.name.charAt(0).toUpperCase() + path.name.slice(1);
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography key={path.name}>{path.name}</Typography>
          ) : (
            <Link
              className="breadcrumb-link Button-Link"
              key={path.name}
              to={routeTo}
            >
              <Typography className="cursor-pointer" key={path.name}>
                {path.name}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
export default withRouter(CustomizedBreadcrumbs);
