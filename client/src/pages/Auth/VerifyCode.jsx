import { useState } from "react";
import { Link } from "react-router-dom";
import dzong from "../assets/dzong.jpeg";

export const VerifyCode = () => {

  const [user, setUser] = useState({
    code: ""
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
    // Handle form submission, e.g., API call to log in
    console.log('Submitting form with:', user);
    // Add your login logic here
  };

  return (
    <>
      <div>VerifyCode</div>

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
              <ol><li
                style={{ listStyleType: 'none' }}>
                Back to login</li>
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
                    className="form-control"
                    value={user.email}
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
      </div >
    </>
  )
}
