import React, { useEffect, useState } from "react";
import { url } from "../URL/url";
import axios from "axios";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Link, NavLink, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory, browserHistory } from "react-router";
import Company from "./Company";
import { useDispatch, useSelector } from "react-redux";
import { CategoryIdSlice } from "../Slices/subCategoryId";
import { Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SubCategories(props) {
  const history = useHistory();
  const mylocation = useLocation();
  const dispatch = useDispatch();
  const actions = CategoryIdSlice.actions;
  const [Categories, setCategories] = useState([]);
  const [showCompany, setShowCompany] = useState(false);
  const [id, setId] = useState();
  const [name, SetName] = useState();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const location = props.location.pathname;
    const route = location.substring(location.lastIndexOf("/") + 1);

    axios
      .get(`${url}api/user-view-sub-catagories/${route}`)
      .then((response) => {
        setCategories(response.data.result);
      });
  }, [props]);

  const getSubCategories = (item) => {
    history.push(`/subCategories/${item.name}`);
  };
  const getCompany = (item) => {
    return (
      <>
        <Company detail={item} />
      </>
    );
  };

  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <div className="gridview">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Categories.map((item, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="companyGrid"
              >
                <label
                  className="breadcrumb-link cursor"
                  onClick={() => {
                    if (item.children.length) {
                      // (history.push({
                      //   pathname:`/subCategories/${item.name}`,
                      //   state:item.Id
                      //  }))
                    } else {
                      setShowCompany(true);
                    }
                  }}
                >
                  {!showCompany ? (
                    <Item>
                      <Image
                        src={`${url}images/${item.image.split("/").slice(-1)}`}
                        alt={item.image.split("/").slice(-1)}
                        fluid
                        className="imageGrid"
                      />
                    </Item>
                  ) : (
                    <>
                      <Company detail={item.Companies} />
                    </>
                  )}
                </label>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default withRouter(SubCategories);

// to={(item.children.length)? `${props.match.url}/${item.name}`: `/company/${item.id}`}
