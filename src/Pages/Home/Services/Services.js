import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState();
  useEffect(() => {
    fetch("https://peace-tourism-app.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <div className="py-12">
        <h2 className="text-4xl text-center font-semibold">OUR PACKAGES</h2>
        <p className="text-center">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words <br /> which don't look even slightly
          believable.{" "}
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <ServiceCard key={service?._id} service={service}></ServiceCard>
        ))}
      </div>
      <Link to="/add_services">
        <div className="text-center">
          <input
            className="btn mb-4 mx-auto"
            type="submit"
            value="See All ->"
          />
        </div>
      </Link>
    </div>
  );
};

export default Services;
