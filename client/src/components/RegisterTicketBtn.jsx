import axios from "axios";
import React, { useState } from "react";
import { useStore } from "../context/Store";
import { toast } from "react-toastify";

const RegisterTicketBtn = () => {
  const id = localStorage.getItem("agencyId");
  const { refreshAgencyMembers } = useStore();

  const [formData, setFormData] = useState({
    agencyId: id || "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    busNumber: "",
    date: "",
    availableSeats: "",
    booked: [],
  });

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const {
        agencyId,
        from,
        to,
        departureTime,
        arrivalTime,
        price,
        busNumber,
        date,
        availableSeats,
      } = formData;

      if (
        !agencyId ||
        !from ||
        !to ||
        !departureTime ||
        !arrivalTime ||
        !price ||
        !busNumber ||
        !date ||
        !availableSeats
      ) {
        toast.error("All fields are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/agency/registerticket",
        formData
      );

      if (response.status === 201) {
        refreshAgencyMembers(id);
        toast.success("Ticket registered successfully.");
      }

      setFormData({
        agencyId: id || "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        busNumber: "",
        date: "",
        availableSeats: "",
        booked: [],
      });
    } catch (error) {
      console.log("Error registering ticket. " + error.message);
      toast.error("Error registering ticket.");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-bg"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Register ticket
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Register Ticket
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Ticket Form Fields */}
              <div className="mb-3">
                <label htmlFor="from">From</label>
                <input
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  id="from"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="to">To</label>
                <input
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  id="to"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="departureTime">Departure Time</label>
                <input
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="form-control"
                  type="datetime-local"
                  id="departureTime"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="arrivalTime">Arrival Time</label>
                <input
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="form-control"
                  type="datetime-local"
                  id="arrivalTime"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                  type="date"
                  id="date"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  type="number"
                  id="price"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="busNumber">Bus Number</label>
                <input
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  id="busNumber"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="availableSeats">Available Seats</label>
                <input
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  className="form-control"
                  type="number"
                  id="availableSeats"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outlined"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-bg"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTicketBtn;
