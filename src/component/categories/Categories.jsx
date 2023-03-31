import React, { useEffect, useState } from "react";
import { url } from "../URL/url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { CategoryIdSlice } from "../Slices/subCategoryId";
import Controls from "../controls/Controls";
import Typography from "@mui/material/Typography";
import { Autocomplete, Toolbar } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import Layout from "../Layout";
import { Card, CardMedia, CardContent, ButtonBase } from "@mui/material";
import slugify from "slugify";
const makeData = (result) => {
  return result.map((data) => {
    return {
      name: data.name,
      image: data.image,
      createdAt: data.createdAt,
      Id: data.Id,
      parentId: data.parentId,
      parent: data.parent?.name || null,
      children: data.children || null,
    };
  });
};
function SubCategories(props) {
  const history = useHistory();
  const mylocation = useLocation();

  const [Categories, setCategories] = useState([]);
  const [AllCategories, setAllCategories] = useState([]);
  const [showCompany, setShowCompany] = useState(false);

  const [open, setOpen] = useState(false);
  const location = props.location.pathname;
  const [inputValue, setInputValue] = React.useState("");
  const [Value, setValue] = React.useState();
  const match = useMediaQuery("(min-width:600px)");
  useEffect(async () => {
    const route = location.substring(location.lastIndexOf("/") + 1);
    setOpen(false);
    axios
      .get(`${url}api/view-all-catagories-with-children`)
      .then((response) => {
        if (response.data.result) {
          const old_result = makeData(response.data.result);
          // console.log(old_result);
          axios.get(`${url}api/view-all-catagories`).then((response) => {
            if (response.data.result) {
              const new_result = makeData(response.data.result);
              // console.log("n", new_result);
              let tempArray = [];
              old_result.forEach((catagorychild) => {
                if (catagorychild.parentId != null) {
                  new_result.forEach((catagory) => {
                    if (catagorychild.parentId == catagory.Id) {
                      tempArray.push({
                        ...catagorychild,
                        parent: catagory.name,
                      });
                    } else {
                      return;
                    }
                  });
                } else {
                  tempArray.push({
                    ...catagorychild,
                    parent: null,
                  });
                }
              });
              console.log(tempArray);
              if (route == "catagories") {
                setShowCompany(false);
                setCategories(
                  tempArray.filter((catagory) => catagory.parent == null)
                );
                setOpen(true);
              } else {
                setCategories(mylocation.state.item.children);
                setOpen(true);
              }
              setAllCategories(tempArray);
            }
          });
        }
      });
  }, [location]);

  return (
    <Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="catagory__wrapper">
        {/* <Toolbar> */}
        <div className="catagory__filter">
          {match && (
            <Typography variant="h5" style={{ color: "rgb(20, 61, 89)" }}>
              Catagories
            </Typography>
          )}
          <Autocomplete
            value={Value}
            onChange={(event, newValue) => {
              // setValue(newValue);
              if (newValue != null) {
                if (newValue.children && newValue.children.length) {
                  history.push({
                    pathname: `${props.match.url}/${slugify(newValue.name)}`,
                    state: { item: newValue },
                  });
                } else {
                  history.push({
                    pathname: `/companies/${slugify(newValue.name)}`,
                    state: { item: newValue },
                  });
                }
              }
            }}
            inputValue={inputValue}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={AllCategories}
            sx={{ width: "100%" }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
                key={option.Id}
              >
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                variant="outlined"
                label="Filter Catagories"
                type="text"
              />
            )}
          />
        </div>
        {/* </Toolbar> */}
        <div className="catagory__list ">
          {Categories.map((item, index) => (
            <Card raised key={index} style={{ borderRadius: "15px" }}>
              <ButtonBase
                onClick={() => {
                  if (item.children && item.children.length) {
                    history.push({
                      pathname: `${props.match.url}/${slugify(item.name)}`,
                      state: { item },
                    });
                  } else {
                    history.push({
                      pathname: `/companies/${slugify(item.name)}`,
                      state: { item },
                    });
                  }
                }}
                className="news__body"
              >
                <div
                  style={{
                    overflow: "hidden",
                    alignSelf: "flex-start",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="170"
                    image={item.image}
                    alt="Paella dish"
                  />
                </div>

                <CardContent
                  style={{
                    padding: "5px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ color: "rgb(20, 61, 89)", fontSize: "15px" }}
                  >
                    {_.startCase(_.toLower(item.name))}
                  </Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default withRouter(SubCategories);
