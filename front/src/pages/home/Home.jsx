import React from "react";
import ProductCategories from "../../modules/views/ProductCategories";
import ProductValues from "../../modules/views/ProductValues";
import ProductHowItWorks from "../../modules/views/ProductHowItWorks";
import HomeTopSection from "../../modules/views/HomeTopSection";
import HeaderBar from "../../modules/views/HeaderBar";

function Home() {
  return (
    <>
      <HeaderBar />
      <HomeTopSection />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
    </>
  );
}

export default Home;
