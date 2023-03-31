import {
  Autocomplete,
  Box,
  CircularProgress,
  Pagination,
  PaginationItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import Controls from "../controls/Controls";
// import Logo from "../Files/company-portal/logo-on-christmas.png";
//import Logo from "../Files/company-portal/infoEthiopiaLogo2.png";
import { url } from "../URL/url";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router";
import Notification from "../customHelpers/Notification";
import _ from "lodash";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
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
const newsPerPage = 21;
const FilterCompany = () => {
  let query = useQuery();
  const history = useHistory();
  const { state } = useLocation();
  const [states, setState] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(state[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const loadingA = open && states.length === 0;
  const [NumCompanies, setNumCompanies] = React.useState(0);
  const [data, setData] = React.useState({
    Companies: [],
    loading: false,
  });
  const { Companies, loading } = data;
  React.useEffect(() => {
    setState(state);
    setData({
      ...data,
      loading: true,
    });
    axios
      .get(
        `${url}api/view-filtered-company-with-page/${query.get("name")}/${
          page - 1
        }/${newsPerPage}`
      )
      .then((response) => {
        setNumCompanies(response.data.count);

        setData({
          loading: false,
          Companies: response.data.result,
        });
      });
  }, [query.get("name")]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="companies__wrapper">
      <Toolbar>
        <Box
          style={{
            display: "flex",
            gap: "10px",
            padding: "20px 0px",
            width: "100%",
          }}
        >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={states}
            sx={{ width: "100%" }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={loadingA}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Filter By State"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingA ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              );
            }}
          />
          <Controls.Button
            text="Filter"
            onClick={() => {
              if (value) {
                history.push({
                  pathname: `/filter-company`,
                  search: `name=${value}`,
                  state: states,
                });
              } else {
                setNotify(true);
              }
            }}
          />
        </Box>
      </Toolbar>
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="company__list ">
            {Companies.map((item, index) => {
              const image = item.logo ? item.logo : Logo;
              return (
                <div className="catagory__card" key={index}>
                  <div
                    className="blurBackground"
                    style={{
                      backgroundImage: "url(" + image + ")",
                    }}
                  />
                  <div
                    className="card"
                    onClick={() => {
                      history.push({
                        pathname: `/companies/${item.Catagory?.name}/${slugify(
                          item.name
                        )}`,
                        state: { item },
                      });
                    }}
                    style={{
                      backgroundImage: "url(" + image + ")",
                    }}
                  >
                    <div className="card__inner">
                      <Typography>
                        {_.startCase(_.toLower(item.name))}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
      )}{" "}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default FilterCompany;
