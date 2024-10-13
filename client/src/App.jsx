import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Home } from "./pages/Users/Home";
import { Dashboard } from "./pages/AdminDashboard/Dashboard";
import { BookingSeats } from "./pages/Users/BookingSeats";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import Header from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { SetPassword } from "./pages/Auth/SetPassword";
import { VerifyCode } from "./pages/Auth/VerifyCode";
import { UserProfile } from "./pages/Users/UserProfile";
import { AdminUsers } from "./pages/AdminDashboard/AdminUsers";
import { AdminPaymentDetails } from "./pages/AdminDashboard/AdminPaymentDetails";
import { AdminBookings } from "./pages/AdminDashboard/AdminBookings";
import { SingleBookingDetails } from "./pages/AdminDashboard/SingleBookingDetails";
import { SearchTickets } from "./pages/Users/SearchTickets";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/search-tickets" element={<SearchTickets />} />

        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking-tickets/:id" element={<BookingSeats />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-payments" element={<AdminPaymentDetails />} />
          <Route path="/admin-bookings" element={<AdminBookings />} />
          <Route
            path="/admin-booking-sigle"
            element={<SingleBookingDetails />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
