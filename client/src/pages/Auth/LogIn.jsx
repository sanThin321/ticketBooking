import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dzong from "../../assets/dzong.jpeg";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../auth/auth";

export const LogIn = () => {
  const [userCredentials, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeToken, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userCredentials.email || !userCredentials.password) {
      toast.error("Fields cannot be empty.")
      return;
    }
    
    try {
      const response = axios.post(
        "http://localhost:4004/pelrizhabtho/login",
        userCredentials
      );

      if ((await response).status === 200) {
        storeToken((await response).data);
        toast.success("Login successful.");
        navigate("/");
      }

      if ((await response).status == 401 || (await response).status == 400 ) {
        toast.error("Invalid email or password.")
        return;
      }

    } catch (error) {
     
        console.log(error.message)
   
      
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-12 col-md-7 col-lg-7 pe-5">
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
                  value={userCredentials.email}
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
                  value={userCredentials.password}
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
                {isLoggedIn ? "Loading..." : "Login"}
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
