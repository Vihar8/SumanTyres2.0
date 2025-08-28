import React from "react";
import HomeBanner from "../components/Landing/HomeBanner/HomeBanner";
import ProjectDetails from "../components/Landing/ProjectDetails/ProjectDetails";
import ProductShowcase from "../components/Landing/ProductShowcase/ProductShowcase";
// import Card from "../components/Landing/MiddleCard/Card";

const Landing = () => {
  return (
    <>
      {/* <Card /> */}
      <HomeBanner />
      <ProjectDetails />
      <ProductShowcase />
    </>
  );
};

export default Landing;
