import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Backdrop from "@mui/material/Backdrop";
import { DrawerSlice } from "../Slices/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAccordion from "@mui/material/Accordion";
import { useHistory } from "react-router-dom";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { url } from "../URL/url";
import { useDispatch, useSelector } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Categories(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState();
  const [open, setOpen] = React.useState(true);
  const [Categories, setCategories] = useState([]);
  const actions = DrawerSlice.actions;
  const showDrawer = useSelector((state) => state.Drawer.isOpen);
  useEffect(() => {
    axios.get(`${url}api/view-main-catagories`).then((response) => {
      if (response.data.result) {
        setOpen(false);
        setCategories(response.data.result);
      }
    });
  }, [showDrawer]);

  const closeDrawer = () => {
    dispatch(actions.hideDrawer());
    document.body.style.overflow = "visible";
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="mobileCategoryList">
      {/* <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
           >
            <CircularProgress color="inherit" />
      </Backdrop> */}
      {Categories.map((item) => {
        return (
          <div style={{ marginLeft: "3vh" }}>
            <ul>
              <li
                onClick={() => {
                  if (item.children.length) {
                    history.push({
                      pathname: `categories/${item.name}`,
                      state: { item },
                    });
                    closeDrawer();
                  } else {
                    history.push({
                      pathname: `/companies/${item.name}`,
                      state: { item },
                    });
                    closeDrawer();
                  }
                }}
              >
                {item.name}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
