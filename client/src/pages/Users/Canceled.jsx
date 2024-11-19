import { NavLink } from "react-router-dom";
import canceled from "../../assets/canceled.jpeg"; // Replace with the actual path to your "canceled" image

export const Canceled = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <div className="mb-4">
          <img src={canceled} alt="Payment Canceled" style={{ width: "150px" }} />
        </div>
        <h1 className="mb-3 ">Payment Canceled</h1>
        <p className="text-muted mb-4">
          Your payment process has been canceled. If this was a mistake, you can try again.
        </p>
        <NavLink to="/" className="btn btn-bg text-dark">
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
};
