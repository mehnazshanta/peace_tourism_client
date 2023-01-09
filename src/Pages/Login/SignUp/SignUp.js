import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/image/login.svg";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
} from "firebase/auth";
import { useState } from "react";
import app from "../../../firebase/firebase.config";

const auth = getAuth(app);

const SignUp = () => {
  const [user, setUser] = useState({});
  const { createUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        form.reset();
        navigate(from, { replace: true });
        // console.log(user);
      })
      .catch((err) => console.error(err));
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
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
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
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
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-primary mt-4 font-bold"
              >
                <FaGoogle />
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-primary-600 font-bold" to="/login">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
