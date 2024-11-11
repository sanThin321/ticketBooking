import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dzong from "../../assets/dzong.jpeg";
import { toast } from "react-toastify";
import axios from "axios";
export const SetPassword = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.password || !user.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4004/pelrizhabtho/resetPassword/${userId}`,
        {
          newPassword: user.password,
          confirmPassword: user.confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful!");
        localStorage.removeItem("userId"); // Clear userId from local storage
        navigate("/login");
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resetting the password.");
    }
    // Handle form submission, e.g., API call to log in
    console.log("Submitting form with:", user);
    // Add your login logic here
  };

  return (
    <>
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
              <Link
                to="/sign-up"
                style={{ color: "#FF8682", textDecoration: "none" }}
              >
                back to login
              </Link>
              <h1>Set a Password</h1>
              <p>
                Your previous password has been reset. Please set a new password
                for your account.{" "}
              </p>
            </div>

            <form className="g-3 pe-5" onSubmit={handleSubmit}>
              <div className="col-auto mb-4">
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Create Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Re-enter Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="off"
                    type="password"
                    className="form-control"
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-auto w-100">
                <button
                  type="submit"
                  className="btn mb-3 w-100"
                  style={{ backgroundColor: "#8DD3BB" }}
                >
                  Set Password
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-5 col-lg-5">
            <img src={dzong} className="img-fluid rounded" alt="dzong" />
          </div>
        </div>
      </div>
    </>
  );
};
