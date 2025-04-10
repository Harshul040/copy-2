import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />

      {/* Only show welcome message on homepage */}
      {pathname === "/" && (
        <div className="compass">
          <p className="intro">
            Welcome to <b className="career">Career Compass</b>, your trusted platform for connecting with individuals who share their career journeys. Discover inspiring experiences, gain valuable insights, and share your own story to guide and empower others on their path to success.
          </p>
        </div>
      )}

      <Outlet />
      
      <Footer />
    </>
  );
};

export default Layout;
