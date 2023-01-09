import React from "react";
import { Link } from "react-router-dom";
import "./BannerItem.css";

const BannerItem = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img">
        <img src={image} alt="" className="w-full rounded-xl" />
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
        <h1 className="text-6xl font-bold text-white">
          Fly with Us <br />
          Best Price Available <br />
          best customer experience
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 top-1/2">
        <p className="text-xl text-white">
          we offer the lowest price with the highest customer experience
          rating.. plan your next tour
        </p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-2/3">
        <Link to="/add_services">
          <button className="btn btn-outline btn-warning">Book Now</button>
        </Link>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
