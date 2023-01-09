import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/image/banner-5-new.jpg";

const MidBanner = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <img alt="" src={img} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              You Dream it, <br /> We Take Care of it{" "}
            </h1>
            <p className="py-6">
              When you sign up or sign into your Expedia Rewards account, you
              can access instant savings worth 10% or more on select hotels each
              time you see a yellow Member Price tag, in addition to the points
              you’ll earn on eligible bookings along the way. Terms may apply.
            </p>
            <Link to="/add_services">
              <button className="btn btn-primary">EXPLORE MORE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
