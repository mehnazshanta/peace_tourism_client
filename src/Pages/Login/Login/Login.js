import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/image/login.svg";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import app from "../../../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };

        console.log(currentUser);

        // get jwt token
        fetch("https://peace-tourism-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("booking-token", data.token);
            form.reset();
            navigate(from, { replace: true });
          });
      })
      .catch((err) => console.error(err));
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
          <h1 className="text-5xl text-center font-bold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary mt-4 font-bold"
            >
              <FaGoogle />
            </button>
          </form>
          <p className="text-center">
            New to Peace Tourism{" "}
            <Link className="text-primary-600 font-bold" to="/signup">
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
