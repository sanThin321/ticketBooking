import { useState } from "react";
import { Link } from "react-router-dom";
import dzong from "../assets/dzong.jpeg";

export const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userType: "passenger",
    agencyName: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "radio") {
      setUser((prevUser) => ({
        ...prevUser,
        userType: id,
        agencyName: id === "agencyOwner" ? prevUser.agencyName : "", // Clear agencyName if not "agencyOwner"
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-12 col-md-5 col-lg-5">
          <img src={dzong} className="img-fluid rounded" alt="dzong" />
        </div>
        <div className="col-12 col-md-7 col-lg-7 ps-5">
          {/* <img
            src="Header-logo.png"
            className="img-fluid mb-5"
            alt="Header Logo"
            width={210}
          /> */}
          <div className="mb-4">
            <h1>Sign Up</h1>
            <p>
              Let’s get you all set up so you can access your personal account.
            </p>
          </div>

          <form className="g-3" onSubmit={handleSubmit}>
            <div className="col-auto mb-4 d-flex justify-content-between gap-4">
              <div className="w-50">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="off"
                  className="form-control"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="w-50">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-auto mb-4 d-flex justify-content-between gap-4">
              <div className="w-50">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="w-50">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className="form-control"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="col-auto mb-4 d-flex justify-content-between gap-4">
              <div className="w-50">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="w-50">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="off"
                  className="form-control"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-auto mb-4 d-flex gap-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="passenger"
                  checked={user.userType === "passenger"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="passenger">
                  Passenger
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="agencyOwner"
                  autoComplete="off"
                  checked={user.userType === "agencyOwner"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="agencyOwner">
                  Agency Owner
                </label>
              </div>
            </div>

            {user.userType === "agencyOwner" && (
              <div className="mb-4">
                <label htmlFor="agencyName" className="form-label">
                  Agency Name
                </label>
                <input
                  id="agencyName"
                  type="text"
                  className="form-control"
                  value={user.agencyName}
                  onChange={handleChange}
                  placeholder="Tashi Transport"
                />
              </div>
            )}
            <hr className="mt-5" />
            <div className="col-auto w-100">
              <button
                type="submit"
                className="btn mb-3 w-100"
                style={{ backgroundColor: "#8DD3BB" }}
              >
                Login
              </button>
              <div className="d-flex gap-3 ">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  style={{ color: "#FF8682", textDecoration: "none" }}
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
