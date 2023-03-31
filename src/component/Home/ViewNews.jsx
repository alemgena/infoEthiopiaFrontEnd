import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { url } from "../URL/url";
import { withRouter } from "react-router-dom";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import MetaTags from "react-meta-tags";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Layout from "../Layout";
const ViewNews = (props) => {
  const [newsToView, setnewsToView] = useState({});
  let location = useLocation();
 
  useEffect(() => {

        const value = location.pathname.split("/").filter((x) => x)[
          location.pathname.split("/").filter((x) => x).length - 1
        ];
        const newValue = value.replaceAll('-',' ');
        console.log("the params is",newValue)
        console.log(value)
            axios.get(`${url}api/get-newsByTitle/${value}`).then((response) => {

              console.log("the detailed newe will be",response);
              setnewsToView(response.data.result);
            });
  }, [location]);
  return (
    <Layout>
      <div className="detailNewsHolder">
        <Typography variant="h5">
          {newsToView.title?.charAt(0).toUpperCase() +
            newsToView.title?.slice(1)}
        </Typography>

        <p style={{ margin: "10px 0px" }}>
          Written by{" "}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "rgb(151, 150, 150)",
            }}
          >
            {newsToView.author}
          </span>{" "}
          | Published{" "}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "rgb(151, 150, 150)",
            }}
          >
            {moment(newsToView.createdAt).fromNow()}
          </span>
        </p>
        <Image
          src={newsToView.headingImage}
          alt={newsToView.headingImage}
          fluid
          className="news-headImage"
        />

        <ReactQuill readOnly={true} value={newsToView.body} theme="bubble" />
      </div>
    </Layout>
  );
};

export default ViewNews;
