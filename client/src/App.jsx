import { Routes, Route, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Payment } from "./pages/Payment";
import { Booking } from "./pages/Booking";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Footer } from "./components/Footer";


const App = () => {
  return (
    <BrowserRouter>
   <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/booking" element={<Booking/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
