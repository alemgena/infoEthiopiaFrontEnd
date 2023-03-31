import { useEffect } from "react";
import queryString from "query-string";
import Company from "./Company";
import {} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Categories from "./Categories";

const Category = (props) => {
  const mylocation = useLocation();
  const location = props.location.pathname;
  const value = queryString.parse(props.location.search);
  const route = location.substring(location.lastIndexOf("/") + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="category">
      {route === "categories" ? (
        <Categories />
      ) : (
        <>
          <Company data={route} />
        </>
      )}
    </div>
  );
};
export default withRouter(Category);
