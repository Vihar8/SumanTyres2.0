import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import ScrollToTopButton from "../commoncomponents/ScrollToTopButton/ScrollToTopButton";

const Layout = () => {
  return (
    <>
      <Header />
    
      <div className="mainLayout">
        <Outlet />
      </div>

      <Footer />
      
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
