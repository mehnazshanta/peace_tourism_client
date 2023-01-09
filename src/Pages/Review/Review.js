import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Review = () => {
  const { _id, packageName, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const booking = {
      service: _id,
      serviceName: packageName,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    if (phone.length > 11) {
      alert("Phone number should be 10 characters or longer");
    } else {
    }

    fetch("https://peace-tourism-app.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <form onSubmit={handlePlaceBooking}>
        <h2 className="text-4xl text-center">
          You are about to booking for: <br />
          <span>
            {packageName}: ${price}{" "}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-3/4 mx-auto  mt-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-ghost input-bordered"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-ghost input-bordered"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-ghost input-bordered"
            required
          />
          <input
            name="email"
            type="text"
            placeholder="Your email"
            defaultValue={user?.email}
            className="input input-ghost input-bordered"
            readOnly
          />
          <textarea
            name="message"
            className="textarea textarea-bordered  h-24   my-4"
            placeholder="Your Review"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <input
            className="btn mb-4 mx-auto"
            type="submit"
            value="Add Booking"
          />
        </div>
      </form>
    </div>
  );
};

export default Review;
