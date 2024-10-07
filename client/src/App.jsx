import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Payment } from "./pages/Payment";
import { BookingSeats } from "./pages/Users/BookingSeats";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import Header from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { SetPassword } from "./pages/Auth/SetPassword";
import { VerifyCode } from "./pages/Auth/VerifyCode";
import { UserProfile } from "./pages/UserProfile";
import { AdminUsers } from "./pages/Dashboard/AdminUsers";
import { AdminPaymentDetails } from "./pages/Dashboard/AdminPaymentDetails";
import { AdminBookings } from "./pages/Dashboard/AdminBookings";
import { SingleBookingDetails } from "./pages/Dashboard/SingleBookingDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-tickets" element={<BookingSeats />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-payments" element={<AdminPaymentDetails />} />
        <Route path="/admin-bookings" element={<AdminBookings />} />
        <Route path="/admin-booking-sigle" element={<SingleBookingDetails />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
