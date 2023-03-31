import React from "react";
import Navbar from "./Home/navbar";
import Breadcrumb from "./Utiles/breadcrumb";
import Drawer from "./Utiles/Drawer";
import { useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "./Utiles/footer";
const Layout = ({ children }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [navToggle, setNavToggle] = React.useState(false);
  const mainRef = React.createRef();
  const navClick = () => {
    setNavToggle(!navToggle);
  };
  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="main" ref={mainRef}>
      <div style={{ flexGrow: "1" }}>
        <Navbar navClick={navClick} />
        <Breadcrumb />
        {navToggle && (
          <Drawer setNavToggle={setNavToggle} navToggle={navToggle} />
        )}
        {children}
      </div>

      <div>{matches && <Footer />}</div>
      <div className="backtotop" onClick={() => scrollTo(mainRef)}>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default Layout;
