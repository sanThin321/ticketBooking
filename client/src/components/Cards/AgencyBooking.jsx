import {
  Armchair,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Minus,
} from "lucide-react";
import Bus from "../../assets/Bus.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dzongkhagsAndDungkhags from "../../data/Dzongkhags";
import { useStore } from "../../context/Store";
import { toast } from "react-toastify";
import axios from "axios";

export const AgencyBooking = ({ data, onEditClick, selectedTicket }) => {
  const { agencyBuses, refreshAgencyBuses, refreshAgencyTickets } = useStore();
  const aid = localStorage.getItem("agencyId");

  const [formData, setFormData] = useState({
    from: selectedTicket?.from || "",
    to: selectedTicket?.to || "",
    departureTime: selectedTicket?.departureTime || "",
    arrivalTime: selectedTicket?.arrivalTime || "",
    price: selectedTicket?.price || 0,
    busId: selectedTicket?.bus?._id || "",
  });

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("From");
  const [selectedTo, setSelectedTo] = useState("To");
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  // Format the departure and arrival times
  const departureTime = new Date(data.departureTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const arrivalTime = new Date(data.arrivalTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Format the departure date
  const departureDate = new Date(data.departureTime).toLocaleDateString(
    "en-GB"
  );
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

  useEffect(() => {
    if (selectedTicket) {
      setFormData({
        from: selectedTicket.from,
        to: selectedTicket.to,
        departureTime: selectedTicket.departureTime,
        arrivalTime: selectedTicket.arrivalTime,
        price: selectedTicket.price,
        busId: selectedTicket.bus?._id,
      });
    }
  }, [selectedTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4004/pelrizhabtho/agency/updateTicket/${id}`,
        formData
      );

      if (res.status === 200) {
        toast.success("Ticket details updated successfully.");
      }
    } catch (error) {
      toast.error("Unable to update. " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4004/pelrizhabtho/agency/deleteTicket/${id}`
      );

      if (res.status === 200) {
        toast.success("Ticket deleted successfully.");
        refreshAgencyTickets(aid)
      }
    } catch (error) {
      toast.error("Unable to delete ticket.");
    }
  };

  useEffect(() => {
    refreshAgencyBuses(aid);
  }, [aid]);

  return (
    <div className="bg-white rounded border py-3 px-4 mb-3 hover">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div
            className="d-flex gap-3 pe-5 align-items-center"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Bus}
                className="rounded mx-auto d-block"
                alt="bus default icons"
                width={100}
              />
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <p className="mb-0">
                  <small>{data.from}</small>
                </p>
                <h5 className="mb-0">{departureTime}</h5>
              </div>
              <div>
                <Minus />
              </div>
              <div>
                <p className="mb-0">
                  <small>{data.to}</small>
                </p>
                <h5 className="mb-0">{arrivalTime}</h5>
              </div>
            </div>
          </div>

          <div className="d-flex gap-5 ms-3 pe-5">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <CalendarDays color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">
                  <small>Date</small>
                </p>
                <p className="mb-0">{departureDate}</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Armchair color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6">
                  <small>No. Seats</small>
                </p>
                <p className="mb-0">{data.bus?.totalSeat}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn px-2"
            style={{ border: "1.5px solid #8DD3BB" }}
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <ChevronRight />
          </button>

          <div
            className="dropdown-menu dropdown-menu-end mt-2"
            aria-labelledby="dropdownMenuButton"
          >
            <Link
              to={`/agency/booking-sigle/${data._id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-item hover">View details</button>
            </Link>

            <button
              className="dropdown-item hover"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              onClick={() => onEditClick(data)}
            >
              Edit
            </button>

            <button
              className="dropdown-item hover"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => onEditClick(data)}
            >
              Delete
            </button>
          </div>

          {/* Delete Confirmation Modal */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this ticket?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-bg"
                    data-bs-dismiss="modal"
                    onClick={() => handleDelete(selectedTicket._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Ticket Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
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
                              className="form-control custom-search"
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
                              className="form-control custom-search"
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
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-bg"
                    data-bs-dismiss="modal"
                    onClick={() => handleEdit(selectedTicket._id)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
