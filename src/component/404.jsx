import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div class="page">
      <div class="notfoundcontent">
        <h1>404</h1>
        <h2>Page not found.</h2>
        <p>The page you are requesting does not exist.</p>
        <Link to="/" className="backtohome">
          Back to home
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
