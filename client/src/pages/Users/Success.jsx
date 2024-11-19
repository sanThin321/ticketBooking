import { NavLink } from "react-router-dom";
import checked from "../../assets/check-512.webp"; // Fixed the path typo

export const Success = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <div className="mb-4">
          <img src={checked} alt="Success" style={{ width: "150px" }} />
        </div>
        <h1 className="mb-3">Payment Successful!</h1>
        <p className="text-muted mb-4">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>
        <NavLink to="/" className="btn btn-bg text-dark">
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
};
