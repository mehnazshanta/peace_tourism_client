import React, { useEffect, useState } from "react";

const MyBookingRow = ({ booking, handleDelete, handleStatusUpdate }) => {
  const { _id, serviceName, phone, customer, price, service, status } = booking;
  const [bookingService, setBookingService] = useState({});

  useEffect(() => {
    fetch(`https://peace-tourism-app.vercel.app/services/${service}`)
      .then((res) => res.json())
      .then((data) => setBookingService(data));
  }, [service]);

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {bookingService?.imgURL && (
                <img
                  src={bookingService.imgURL}
                  alt="Avatar Tailwind CSS Component"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">${price}</span>
      </td>
      <td>Premium</td>
      <td>
        <th>
          <label>
            <button onClick={() => handleDelete(_id)} className="btn btn-error">
              X
            </button>
          </label>
        </th>
      </td>
    </tr>
  );
};

export default MyBookingRow;
