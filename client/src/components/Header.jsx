import { Bookmark, CreditCard, LayoutGrid, Tags, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-white"
      style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="Header-logo.png" className="img" alt="Logo" width={130} />
        </Link>

        <div className="d-flex gap-3">
          <Link to="/login" className="d-block d-lg-none">
            <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
              Login
            </button>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                <div className="d-flex gap-1 align-items-center">
                  <Tags size={23} />
                  Book Ticket
                </div>
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/dashboard"
              >
                <div className="d-flex gap-1 align-items-center">
                  <LayoutGrid size={20} />
                  Dashboard
                </div>
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/users"
              >
                <div className="d-flex gap-1 align-items-center">
                  <Users size={20} />
                  Users
                </div>
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/booking"
              >
                <div className="d-flex gap-1 align-items-center">
                  <Bookmark size={20} />
                  Booking
                </div>
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/payment"
              >
                <div className="d-flex gap-1 align-items-center">
                  <CreditCard size={20} />
                  Payment
                </div>
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* <img src="Avatar.png" className="img" alt="Logo" width={50} />
            <p className="m-0 p-0">
              <strong>Namgay</strong>
            </p> */}
            <Link to="/login" className="d-none d-lg-block">
              <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
