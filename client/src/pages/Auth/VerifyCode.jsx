import { useState } from "react";
import dzong from "../../assets/dzong.jpeg";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const VerifyCode = () => {
  const [user, setUser] = useState({
    code: "",
  });
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
    if (!user.code) {
      toast.error("Fields cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/verifyCode",
        { code: user.code }
      );

      if (response.status === 200) {
        const { redirectUrl } = response.data;
        localStorage.setItem("userId", redirectUrl); // Store userId in local storage
        toast.success("Code verified! Redirecting to reset password...");
        navigate("/set-password");
      }
    } catch (error) {
      toast.error("Invalid or expired token.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="col-12 col-md-7 col-lg-7 pe-5">
            <div className="mb-4">
              <ol>
                <li style={{ listStyleType: "none" }}>Back to login</li>
              </ol>
              <h1>Verify Code</h1>
              <p> An authentication code has been sent to your email.</p>
            </div>

            <form className="g-3 pe-5" onSubmit={handleSubmit}>
              <div className="col-auto mb-4">
                <div className="mb-4">
                  <label htmlFor="code" className="form-label">
                    Enter Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    className="form-control custom-search"
                    value={user.code}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="col-auto w-100">
                <button
                  type="submit"
                  className="btn mb-3 w-100"
                  style={{ backgroundColor: "#8DD3BB" }}
                >
                  Submit
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
