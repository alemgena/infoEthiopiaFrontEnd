import React from "react";
import Users from "./components/Users";
import Contact from "./components/Contact";
import About from "./components/About";
const routes = {

  "/": () => <Users />,
  "/about": () => <About />,
  "/contact": () => <Contact />
};
export default routes;