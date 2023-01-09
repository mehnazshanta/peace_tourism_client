import React from "react";
import MidBanner from "../../MidBanner/MidBanner";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <MidBanner />
    </div>
  );
};

export default Home;
