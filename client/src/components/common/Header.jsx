import { Link } from "react-router-dom";
import { Bookmark, LayoutGrid, UserRound, Users } from "lucide-react";
import { useAuth } from "../../auth/auth";
import logo from "../../assets/Header-logo.png"
const Header = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  const storedData = localStorage.getItem('user');
  let role = null;
  
  try {
    role = storedData ? JSON.parse(storedData)?.role : null;
  } catch (error) {
    console.error('Error parsing storedData:', error);
  }
  

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-white"
      style={{ boxShadow: "0 4px 16px rgba(17, 34, 17, 0.05)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="img" alt="Logo" width={130} />
        </Link>

        <div className="d-flex gap-3">
          {!isLoggedIn && (
            <Link to="/login" className="d-block d-lg-none">
              <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
                Login
              </button>
            </Link>
          )}
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
            {/* Other navigation items */}
            {/* {isLoggedIn && <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/">
                <div className="d-flex gap-1 align-items-center">
                  <Tags size={23} />
                  Book Ticket
                </div>
              </Link>
            </li>} */}

            {isLoggedIn && <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/profile">
                <div className="d-flex gap-1 align-items-center">
                  <UserRound size={20} />
                  Profile
                </div>
              </Link>
            </li>}

            {/* {isLoggedIn && <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/search-tickets">
                <div className="d-flex gap-1 align-items-center">
                  <Search size={20} />
                  Search Ticket
                </div>
              </Link>
            </li>} */}
            {
              isLoggedIn && role == "Agency" ?
                <li className="nav-item me-3">
                  <Link className="nav-link active" aria-current="page" to="/agency">
                    <div className="d-flex gap-1 align-items-center">
                      <LayoutGrid size={20} />
                      Manage Bus
                    </div>
                  </Link>
                </li>
                : ""
            }

            {isLoggedIn && role === "Agency" ? <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/agency/users">
                <div className="d-flex gap-1 align-items-center">
                  <Users size={20} />
                  Manage Employee
                </div>
              </Link>
            </li> : ""
            }
           {isLoggedIn && role === "Agency" ? <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/agency/bookings">
                <div className="d-flex gap-1 align-items-center">
                  <Bookmark size={20} />
                  Manage Tickets
                </div>
              </Link>
            </li> : ""}
            {/* <li className="nav-item me-3">
              <Link className="nav-link active" aria-current="page" to="/agency/payments">
                <div className="d-flex gap-1 align-items-center">
                  <CreditCard size={20} />
                  Payment
                </div>
              </Link>
            </li> */}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isLoggedIn ? (
              <button className="btn" style={{ backgroundColor: "#8DD3BB" }} onClick={LogoutUser}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="d-none d-lg-block">
                <button className="btn" style={{ backgroundColor: "#8DD3BB" }}>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
