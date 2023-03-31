import React, { useEffect, useState } from "react";
import { url } from "../URL/url";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  ButtonBase,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import Background from "./hero.jpg";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import queryString from "query-string";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import _ from "lodash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Typography,
  Pagination,
  TextField,
  InputAdornment,
  PaginationItem,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SliderComponent from "../Utiles/Slider";
import Slider from "react-slick";
import RegisterCompanyComponent from "../RegisterCompanyComponent";
import Controls from "../controls/Controls";
import Popup from "../customHelpers/Popup";
import CompanyForm from "../Utiles/CompanyForm";
import NewsForm from "../NewsForm";
import Notification from "../customHelpers/Notification";
import UpdateCompanyForm from "../Utiles/UpdateCompanyForm";

const StyledInputBaseSearch = styled(TextField)(({ theme }) => ({
  color: "rgb(20, 61, 89)",
  borderColor: "rgb(20, 61, 89)",
  // borderRadius: "15px",
  outline: "none",
  "& .MuiInputBase-input": {
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

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, "");

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    // Collapse whitespace and replace by -
    .replace(/\s+/g, "-")
    // Collapse dashes
    .replace(/-+/g, "-");

  return str;
}
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} color="white" />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgb(20,61,89)",
  borderRadius: "5px",
  color: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const newsPerPage = 12;
function Service(props) {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [openNewsPopup, setNewsOpenPopup] = React.useState(false);
  const [Q, setQ] = useState("");
  const history = useHistory();
  const newsRef = React.createRef();
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = useState(false);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    scrollTo(newsRef);
    setPage(value);
  };
  const [ads, setAds] = useState({
    spaceOneAds: [],
    spaceTwoAds: [],
    spaceThreeAds: [],
  });
  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChangeEx = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { spaceOneAds, spaceTwoAds, spaceThreeAds } = ads;
  React.useEffect(() => {
    getAllAds();
  }, []);
  const getAllAds = () => {
    axios.get(`${url}api/get-all-ads`).then((response) => {
      if (response.data.err) {
        console.log(response.data.err);
      } else {
        const adOne = response.data.result.filter((ad) => ad.adSpace == "one");
        const adTwo = response.data.result.filter((ad) => ad.adSpace == "two");
        const adThree = response.data.result.filter(
          (ad) => ad.adSpace == "three"
        );
        setAds({
          spaceOneAds: adOne,
          spaceTwoAds: adTwo,
          spaceThreeAds: adThree,
        });
      }
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const matches = useMediaQuery("(min-width:852px)");
  const matchescollaps = useMediaQuery("(min-width:918px)");
  // const handleSearch = (rows) => {
  //   let tempArray = [];
  //   rows.filter((row) =>
  //     row[0].toLowerCase().trim().startsWith(Q.toLowerCase().trim())
  //       ? tempArray.push(row[1])
  //       : false
  //   );
  //   return tempArray;
  // };

  const [News, setNews] = useState([]);
  const numNews = News.length;
  useEffect(() => {
    setLoading(true);
    axios.get(`${url}api/get-news`).then((response) => {
      console.log(response.data);
      setLoading(false);
      setNews(
        response.data.result.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      );
    });
  }, []);
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
  window.addEventListener("scroll", () => {
    const element = document.getElementsByClassName("search__bar")[0];
    if (element) {
      if (window.scrollY > 200) {
        element.classList.remove("show");
      } else {
        element.classList.add("show");
      }
    }
  });

  const loadedNews = News.slice(
    page * newsPerPage - newsPerPage,
    page * newsPerPage
  );

  return (
    <div>
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <div className="content">
          <div className="landing">
            <div className="search__bar__holder">
              <div className="slider__container__top">
                <Slider
                  {...settings}
                  style={{
                    width: "100%",
                    margin: "auto",
                    overflow: "hidden",
                  }}
                >
                  {spaceOneAds.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="slider__image"
                          style={{
                            backgroundImage: "url(" + item.imageURI + ")",
                            height: matchescollaps ? "70vh" : "40vh",
                          }}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div className="search__bar show">
                <div className="search__input__wrapper">
                  <form autoComplete="off" style={{ flexGrow: "1" }}>
                    <StyledInputBaseSearch
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
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={Q}
                      onChange={(e) => {
                        setQ(e.target.value);
                      }}
                    />
                  </form>
                </div>
                {Q !== "" && !fetching && (
                  <div className="search__results">
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
                            <div className="search_result">
                              <Typography variant="h6">
                                {" "}
                                {company[1].name.charAt(0).toUpperCase() +
                                  company[1].name.slice(1)}
                              </Typography>
                              <div style={{ color: "rgba(244,151,3,.8)" }}>
                                {" "}
                                <span>Catagory :- </span>
                                {company[1].Catagory?.name
                                  .charAt(0)
                                  .toUpperCase() +
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
            </div>
            <div ref={newsRef}>
              {loadedNews.length > 0 && (
                <div className="adAndNews">
                  {matchescollaps && (
                    <div className="sideahholder">
                      {spaceThreeAds.map((item, index) => {
                        if (index < 2) {
                          return (
                            <a href={item.link} target="_blank">
                              <div
                                key={index}
                                className="sideads"
                                style={{
                                  backgroundImage: "url(" + item.imageURI + ")",
                                  
                                }}
                              />
                            </a>
                          );
                        }
                      })}
                    </div>
                  )}
                  <div>
                    <div className="news__list">
                      {loadedNews.map((item, index) => {
                        return (
                          <Card raised key={index}>
                            <ButtonBase
                              onClick={() => {
                                history.push(
                                  `/news/${item.title.replace(/\s+/g, "-")}`
                                );
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
                                  height="194"
                                  image={item.headingImage}
                                  alt="Paella dish"
                                  className="image"
                                />
                              </div>
                              <CardContent style={{ padding: "10px" }}>
                                <Typography
                                  variant="body1"
                                  style={{ color: "rgb(20, 61, 89)" }}
                                >
                                  {item.title.charAt(0).toUpperCase() +
                                    item.title.slice(1)}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Written by{" "}
                                  <span style={{ fontWeight: "600" }}>
                                    {item.author}
                                  </span>{" "}
                                  |{" "}
                                  <span style={{ fontWeight: "600" }}>
                                    {moment(item.createdAt).fromNow()}
                                  </span>
                                </Typography>
                              </CardActions>
                            </ButtonBase>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                  {matchescollaps && (
                    <div className="sideahholder">
                      {spaceThreeAds.map((item, index) => {
                        if (index > 1 && index < 4) {
                          return (
                            <div
                              key={index}
                              className="sideads"
                              style={{
                                backgroundImage: "url(" + item.imageURI + ")",
                              }}
                            />
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              )}
              <div className="pagination">
                <Pagination
                  count={Math.ceil(numNews / newsPerPage)}
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
            </div>
          </div>
          <SliderComponent data={spaceTwoAds} />
          {matches && (
            <>
              <div className="forms">
                <Accordion
                  expanded={matchescollaps ? true : expanded === "panel1"}
                  onChange={handleChangeEx("panel1")}
                  className="form"
                >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className="accordionSummery">
                      <Typography>Register your company</Typography>
                      OR
                      <Controls.Button
                        text="Update your company"
                        variant="contained"
                        className="Button"
                        onClick={() => {
                          setOpenPopup(true);
                        }}
                        color="rgba(244,151,3,.8)"
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RegisterCompanyComponent companies={companies} />
                  </AccordionDetails>
                </Accordion>
                {/* <Accordion
                expanded={matchescollaps ? true : expanded === "panel2"}
                onChange={handleChangeEx("panel2")}
                className="form"
              >
                <AccordionSummary
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Contact Us</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ContactUsComponent />
                </AccordionDetails>
              </Accordion> */}
                <Controls.Button
                  variant="contained"
                  className="Button"
                  onClick={() => {
                    setNewsOpenPopup(true);
                  }}
                  text="Add news about your company"
                />
              </div>
            </>
          )}
        </div>
      )}
      <Popup
        title="Update your company."
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateCompanyForm home={true} />
      </Popup>
      <Popup
        title="News Form."
        openPopup={openNewsPopup}
        setOpenPopup={setNewsOpenPopup}
      >
        <NewsForm companies={companies} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default withRouter(Service);
