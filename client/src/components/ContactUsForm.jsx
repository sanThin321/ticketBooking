import React, { useState } from "react";
import contactUsImage from "../assets/ContactUs.png";
import axios from "axios";
import { toast } from "react-toastify";

export const ContactUsForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = {
      email,
      feedbackText: message,
    };

    const res = axios.post("http://localhost:4004/pelrizhabtho", formData);

    if ((await res).status === 200) {
      toast.success("Message send successfully.");
    }

    setEmail("");
    setMessage("");
  };

  return (
    <div
      className="container rounded-2 pt-3 pb-0 position-absolute"
      style={{
        backgroundColor: "#CDEAE1",
        top: "-45%", // Adjust this value to control how much of the form overlaps
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: 10,
      }}
    >
      <div className="row">
        <div className="col-7 pb-3">
          <h2 className="mb-3">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control custom-search"
                placeholder="Your email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control custom-search"
                rows="6"
                placeholder="Message"
                value={message}
                onChange={handleMessageChange}
              />
            </div>
            <button type="submit" className="btn btn-dark px-4">
              Send
            </button>
          </form>
        </div>
        <div className="col-5 d-flex align-items-end justify-content-end pb-0 pt-5">
          <img
            src={contactUsImage}
            className="img mb-0"
            alt="Contact us icon"
            height={220}
          />
        </div>
      </div>
    </div>
  );
};
