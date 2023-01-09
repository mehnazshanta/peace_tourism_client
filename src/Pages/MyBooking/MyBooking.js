import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import MyBookingRow from "./MyBookingRow";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`https://peace-tourism-app.vercel.app/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel this order"
    );
    if (proceed) {
      fetch(`https://peace-tourism-app.vercel.app/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = bookings.filter((odr) => odr._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`https://peace-tourism-server.vercel.app/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = bookings.filter((odr) => odr._id !== id);
          const approving = bookings.find((odr) => odr._id === id);
          approving.status = "Approved";

          const newBookings = [approving, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <div>
      <h2 className="text-5xl text-center my-4">
        You have {bookings.length} Bookings
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Place & Name</th>
              <th>Price</th>
              <th>Quality</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <MyBookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></MyBookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
