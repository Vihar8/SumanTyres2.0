import HomePage_Section1 from "./HomePage.jsx/HomePage_Section1";
import classes from "./Landing.module.scss";
import React from "react";

const PortalDashboard = () => {
  return (
    <div className={`${classes.page_section}`}>
      <HomePage_Section1 />
    </div>
  );
};

export default PortalDashboard;
