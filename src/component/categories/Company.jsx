import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { url } from "../URL/url";
import { Button, useMediaQuery } from "@mui/material";
import { useHistory } from "react-router";
import { Card, CardMedia, CardContent, ButtonBase } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
  Toolbar,
  Grid,
} from "@mui/material";
// import Logo from "../Files/company-portal/logo-on-christmas.png";
//import Logo from "../Files/company-portal/infoEthiopiaLogo2.png";
import Controls from "../controls/Controls";
import _ from "lodash";
import Layout from "../Layout";

const newsPerPage = 21;

function Company(props) {
  const history = useHistory();
  const [data, setData] = useState({
    Companies: [],
    loading: false,
  });

  const [NumCompanies, setNumCompanies] = useState(0);
  const { state } = useLocation();
  const { Companies, loading } = data;
  const [cityValue, setCityValue] = React.useState(null);
  const [stateValue, setStateValue] = React.useState(null);
  const [subCityValue, setSubCityValue] = React.useState(null);
  const [states, setState] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [subCity, setSubCity] = React.useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const filterCompanies = () => {
    if (cityValue || subCityValue || stateValue) {
      const data = {
        city: cityValue,
        sub_city: subCityValue,
        state: stateValue,
      };
      setData({ ...data, loading: true });
      axios
        .put(
          `${url}api/view-filtered-company-with-page/${
            page - 1
          }/${newsPerPage}`,
          data
        )
        .then((response) => {
          setNumCompanies(response.data.count);
          setData({
            loading: false,
            Companies: response.data.result,
          });
        });
    } else {
      getCompanies();
    }
  };
  useEffect(() => {
    getCompanies();
    axios.get(`${url}api/all-addresses`).then((response) => {
      setCity(
        _.uniqWith(
          _.compact(_.map(response.data.result, (address) => address.city)),
          _.isEqual
        )
      );
      setState(
        _.uniqWith(
          _.compact(_.map(response.data.result, (address) => address.state)),
          _.isEqual
        )
      );
      setSubCity(
        _.uniqWith(
          _.compact(_.map(response.data.result, (address) => address.sub_city)),
          _.isEqual
        )
      );
    });
  }, [props, history.location, page]);
  const getCompanies = () => {
    setData({ ...data, loading: true });
    if (state) {
      axios
        .get(
          `${url}api/view-company-in-catagory/${state.item.Id}/${
            page - 1
          }/${newsPerPage}`
        )
        .then((response) => {
          setData({
            loading: false,
            Companies: response.data.result,
          });
          setNumCompanies(response.data.count);
        });
    } else {
      if (location.pathname.split("/").filter((x) => x).length > 1) {
        axios
          .get(
            `${url}api/view-catagory-by-name-with-pagination/${
              location.pathname.split("/").filter((x) => x)[1]
            }/${page - 1}/${newsPerPage}`
          )
          .then((response) => {
            setData({
              loading: false,
              Companies: response.data.result,
            });
            setNumCompanies(response.data.count);
          });
      } else {
        axios
          .get(
            `${url}api/view-all-company-with-page/${page - 1}/${newsPerPage}`
          )
          .then((response) => {
            setNumCompanies(response.data.count);

            setData({
              loading: false,
              Companies: response.data.result,
            });
          });
      }
    }
  };
  const match = useMediaQuery("(min-width:900px)");
  return (
    <Layout>
      <div className="companies__wrapper">
        <Typography
          variant="h5"
          style={{
            marginBottom: "10px",
            textTransform: "capitalize",
            color: " rgb(20, 61, 89)",
          }}
        >
          Companies
        </Typography>
        <Toolbar>
          <div
            style={{
              padding: "0px 0px 20px",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                {!match && (
                  <Typography
                    variant="body1"
                    style={{ color: "rgb(20, 61, 89)" }}
                  >
                    Filter By
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} md={3}>
                <Controls.AutoComplete
                  value={cityValue}
                  setChange={setCityValue}
                  options={city}
                  label={match ? "Filter By City" : "City"}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Controls.AutoComplete
                  value={subCityValue}
                  setChange={setSubCityValue}
                  options={subCity}
                  label={match ? "Filter By Sub city" : "Sub City"}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Controls.AutoComplete
                  value={stateValue}
                  setChange={setStateValue}
                  options={states}
                  label={match ? "Filter By State" : "State"}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <Button
                  onClick={filterCompanies}
            
                  variant="contained"
                  size="large"
                  color="inherit"
                  style={{
                    padding: "8px 70px",
                    textTransform: "capitalize",
                    backgroundColor: "rgb(20, 61, 89)",
                    color: "white",
                    padding: "8px 50px",
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <>
            {Companies.length == 0 ? (
              <div className="no_companies">
                <Typography>
                  no companies has been added to this catagory, if you want to
                  add your company follow this link
                  <Link to="/registercompany">
                    <Controls.Button text="Add Company" />
                  </Link>
                </Typography>
              </div>
            ) : (
              <>
                <div className="company__list ">
                  {Companies.map((item, index) => {
                    const image = item.logo ? item.logo : Logo;
                    return (
                      <Card raised key={index} style={{ borderRadius: "15px" }}>
                        <ButtonBase
                          onClick={() => {
                            history.push(`/${item.slug}`);
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
                              image={image}
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
                              style={{
                                color: "rgb(20, 61, 89)",
                                fontSize: "15px",
                              }}
                            >
                              {_.startCase(_.toLower(item.name))}
                            </Typography>
                          </CardContent>
                        </ButtonBase>
                      </Card>
                    );
                  })}
                </div>{" "}
                <div className="pagination">
                  <Pagination
                    count={Math.ceil(NumCompanies / newsPerPage)}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
export default withRouter(Company);
