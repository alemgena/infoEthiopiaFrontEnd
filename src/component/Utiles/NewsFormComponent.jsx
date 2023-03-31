import { CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import Layout from "../Layout";
import NewsForm from "../NewsForm";
import { url } from "../URL/url";
import queryString from "query-string";
const NewsFormComponent = () => {
  const [values, setValues] = React.useState({
    companies: [],
    loading: false,
    fetching: false,
  });
  const [inputValue, setInputValue] = React.useState("");

  const { companies, loading } = values;

  React.useEffect(() => {
    setValues({ ...values, fetching: true, companies: [] });
    let Timer;
    clearTimeout(Timer);
    Timer = setTimeout(async () => {
      handleSearch();
    }, 1000);
    return () => {
      clearTimeout(Timer);
    };
  }, [inputValue]);
  const handleSearch = () => {
    axios
      .get(
        `${url}api/search-companies-by-name/name?${queryString.stringify({
          search: inputValue,
        })}`
      )
      .then((response) => {
        setValues({ fetching: false, companies: response.data.result });
      })
      .catch((err) => {
        setValues({ ...values, fetching: false });
      });
  };
  return (
    <Layout>
      <div className="newsform">
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <NewsForm
            companies={companies}
            setInputValue={setInputValue}
            inputValue={inputValue}
            loading={values.fetching}
          />
        )}
      </div>
    </Layout>
  );
};

export default NewsFormComponent;
