import { ButtonBase, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../URL/url";
import moment from "moment";

import { useHistory } from "react-router";
import Layout from "../Layout";
import { Card, CardMedia, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

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
const Allnews = () => {
  const history = useHistory();
  const [data, setData] = useState({
    News: [],
    loading: false,
  });
  const { News, loading } = data;
  useEffect(() => {
    setData({ ...data, loading: true });
    axios.get(`${url}api/get-news`).then((response) => {
      setData({
        loading: false,
        News: response.data.result.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        ),
      });
    });
  }, []);
  console.log("All News are",News)
  return (
    <Layout>
      <div className="news">
        <Typography variant="h5" className="page-header">
          News
        </Typography>
        <div className="news__list__wrapper">
          {News.map((item, index) => {
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
                      {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography variant="body2" color="text.secondary">
                      Written by{" "}
                      <span style={{ fontWeight: "600" }}>{item.author}</span> |{" "}
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
    </Layout>
  );
};

export default Allnews;
