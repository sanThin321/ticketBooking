import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "../context/Store";
import { toast } from "react-toastify";
import dzongkhagsAndDungkhags from "../data/Dzongkhags";
import { ChevronDown, ChevronUp } from "lucide-react";

const RegisterTicketBtn = () => {
  const id = localStorage.getItem("agencyId");
  const { refreshAgencyMembers, agencyBuses, refreshAgencyBuses } = useStore();

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("From");
  const [selectedTo, setSelectedTo] = useState("To");
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [formData, setFormData] = useState({
    agencyId: id || "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    busId: "",
    booked: [],
    date: "",
  });

  useEffect(() => {
    refreshAgencyBuses(id);
  }, [id]);

  const filteredDzongkhagsFrom = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredDzongkhagsTo = dzongkhagsAndDungkhags.filter((opt) =>
    opt.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  // Update selected locations in formData when dropdown selections are made
  const handleFromSelection = (name) => {
    setSelectedFrom(name);
    setFormData((prevFormData) => ({
      ...prevFormData,
      from: name,
    }));
    setIsFromOpen(false);
  };

  const handleToSelection = (name) => {
    setSelectedTo(name);
    setFormData((prevFormData) => ({
      ...prevFormData,
      to: name,
    }));
    setIsToOpen(false);
  };

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
      const { agencyId, from, to, departureTime, arrivalTime, price, busId } =
        formData;

      if (
        !agencyId ||
        from === "From" ||
        to === "To" ||
        !departureTime ||
        !arrivalTime ||
        !price ||
        !busId
      ) {
        toast.error("All fields are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/agency/addTicket",
        formData
      );

      if (response.status === 201) {
        refreshAgencyMembers(id);
        toast.success("Ticket registered successfully.");
      }

      // Reset form after successful submission
      setFormData({
        agencyId: id || "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: 0,
        busId: "",
        totalSeat: "",
        booked: [],
      });
      setSelectedFrom("From");
      setSelectedTo("To");
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
              <div className="mb-3 d-flex gap-2">
                <div className="custom-dropdown">
                  <div
                    className="dropdown-header d-flex justify-content-between"
                    onClick={() => setIsFromOpen(!isFromOpen)}
                  >
                    <span>{selectedFrom}</span>
                    <span>
                      {isFromOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </span>
                  </div>
                  {isFromOpen && (
                    <div className="dropdown-list p-1">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search From"
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                      />
                      <div className="dropdown-options">
                        {filteredDzongkhagsFrom.map((opt) => (
                          <div
                            key={opt.id}
                            className="dropdown-item"
                            onClick={() => handleFromSelection(opt.name)}
                          >
                            {opt.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="custom-dropdown">
                  <div
                    className="dropdown-header d-flex justify-content-between"
                    onClick={() => setIsToOpen(!isToOpen)}
                  >
                    <span>{selectedTo}</span>
                    <span>
                      {isToOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </span>
                  </div>
                  {isToOpen && (
                    <div className="dropdown-list p-1">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search To"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                      />
                      <div className="dropdown-options">
                        {filteredDzongkhagsTo.map((opt) => (
                          <div
                            key={opt.id}
                            className="dropdown-item"
                            onClick={() => handleToSelection(opt.name)}
                          >
                            {opt.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="departureTime">Departure Time</label>
                <input
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="datetime-local"
                  id="departureTime"
                  autoComplete="off"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="arrivalTime">Arrival Time</label>
                <input
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="datetime-local"
                  id="arrivalTime"
                  autoComplete="off"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="busId" className="form-label">
                  Bus
                </label>
                <select
                  name="busId"
                  className="form-select custom-search"
                  aria-label="Select Driver"
                  value={formData.busId}
                  onChange={handleChange}
                >
                  <option value="">Select Bus</option>
                  {agencyBuses.map((bus, index) => (
                    <option key={index} value={bus._id}>
                      {bus.busNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="number"
                  id="price"
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
