import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Home } from "./pages/Users/Home";
import { Dashboard } from "./pages/AdminDashboard/Dashboard.jsx";
import { BookingSeats } from "./pages/Users/BookingSeats";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import Header from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { SetPassword } from "./pages/Auth/SetPassword";
import { VerifyCode } from "./pages/Auth/VerifyCode";
import { UserProfile } from "./pages/Users/UserProfile";
import { AdminUsers } from "./pages/AgencyOwner/AdminUsers";
import { AdminPaymentDetails } from "./pages/AdminDashboard/AdminPaymentDetails";
import { AgencyBookings } from "./pages/AgencyOwner/AgencyBookings.jsx";
import { SingleBookingDetails } from "./pages/AgencyOwner/SingleBookingDetails";
import { AgencyOwnerDashboard } from "./pages/AgencyOwner/AgencyOwnerDashboard.jsx";
import { SearchTickets } from "./pages/Users/SearchTickets";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import {Success} from "./pages/Users/Success.jsx"
import {Canceled} from "./pages/Users/Canceled.jsx"
//main function 
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
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Canceled />} />


        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking-tickets/:id" element={<BookingSeats />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/agency/users" element={<AdminUsers />} />
          <Route path="/agency/payments" element={<AdminPaymentDetails />} />
          <Route path="/agency/bookings" element={<AgencyBookings />} />
          <Route path="/agency/" element={<AgencyOwnerDashboard />} />
          <Route
            path="/agency/booking-sigle/:id"
            element={<SingleBookingDetails />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
