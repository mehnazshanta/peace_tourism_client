import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
import img from "../../../assets/image/peace-turism-logo-removebg-preview.png";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };
  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/add_services">Add Services</Link>
      </li>
      <li className="font-semibold">
        <Link to="/booking">My Booking</Link>
      </li>
      <li className="font-semibold">
        <Link to="/blogs">Blogs</Link>
      </li>
      <li className="font-semibold ">
        <Link className="items d-flex">
          <div>
            {user?.uid ? (
              <div className=" grid grid-cols-2 gap-3">
                <Link onClick={handleLogOut}>Logout</Link>

                <h3 style={{ color: "orange" }}>
                  {" "}
                  Welcome.. {user?.displayName}
                </h3>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/login">Log in</Link>
              </div>
            )}
          </div>
          <div className="d-flex">
            {user?.photoURL ? (
              <img
                alt=""
                style={{ height: "30px" }}
                roundedCircle
                src={user?.photoURL}
              />
            ) : (
              <FaUserAlt />
            )}
          </div>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar h-20 pt-4 pb-4 bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className="btn  btn-active normal-case text-4xl ml-36 w-auto h-auto"
        >
          <img alt="" style={{ height: "70px" }} roundedCircle src={img} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {/* <Link className="items d-flex">
          <div>
            {user?.uid ? (
              <div className="d-flex">
                <Link
                  onClick={handleLogOut}
                  className="btn btn-outline btn-warning"
                >
                  Logout
                </Link>
                <h3 style={{ color: "orange" }}>{user?.displayName}</h3>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline btn-warning">
                  Log in
                </Link>
              </div>
            )}
          </div>
          <div className="">
            {user?.photoURL ? (
              <img
                alt=""
                style={{ height: "30px" }}
                roundedCircle
                src={user?.photoURL}
              />
            ) : (
              <FaUserAlt />
            )}
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;
