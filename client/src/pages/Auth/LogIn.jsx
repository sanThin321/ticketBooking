import { useState } from "react";
import { Link } from "react-router-dom";
import dzong from "../../assets/dzong.jpeg";
import axios from "axios";

export const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/login",
        { email: user.email, password: user.password },
        { withCredentials: true } // Allow credentials (cookies) to be included
      );
  
      if (response.statusText === "OK") {
        console.log(response);
      }
    } catch (error) {
      console.error("Error logging in: " + error);
    }
  };
  

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-12 col-md-7 col-lg-7 pe-5">
          {/* <img
            src="Header-logo.png"
            className="img-fluid mb-5"
            alt="Header Logo"
            width={210}
          /> */}
          <div className="mb-4">
            <h1>Log In</h1>
            <p>Login to access your Pelri Zhabtho account. </p>
          </div>

          <form className="g-3 pe-5" onSubmit={handleSubmit}>
            <div className="col-auto mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 d-flex justify-content-end">
                <Link
                  to="/forgot-password"
                  style={{ color: "#FF8682", textDecoration: "none" }}
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="col-auto w-100">
              <button
                type="submit"
                className="btn mb-3 w-100"
                style={{ backgroundColor: "#8DD3BB" }}
              >
                Log In
              </button>
              <div className="d-flex gap-3 ">
                <p>Don&apos;t have an account?</p>
                <Link
                  to="/sign-up"
                  style={{ color: "#FF8682", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-5 col-lg-5">
          <img src={dzong} className="img-fluid rounded" alt="dzong" />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
