import {
  ChevronRight,
  LifeBuoy,
  Flag,
  UserRound,
  BookCheck,
  DoorClosed,
  Ticket,
  SquareUserRound,
  Bus,
} from "lucide-react";
import { BusDetails } from "../../components/Cards/BusDetails";
import { useEffect, useState } from "react";
import { useStore } from "../../context/Store";
import axios from "axios";
import { toast } from "react-toastify";

export const AgencyOwnerDashboard = () => {
  const id = localStorage.getItem("agencyId");
  const { agencyMembers, refreshAgencyMembers } = useStore();

  const [formData, setFormData] = useState({
    agencyId: id,
    driverId: "",
    busNumber: "",
    totalSeat: "",
    imageOfTheBus: "image.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4004/pelrizhabtho/agency/registerbus",
        formData // Send the form data in the POST request
      );

      if (res.status === 200) {
        toast.success("Bus registered successfully.");
        setFormData({
          agencyId: id,
          driverId: "",
          busNumber: "",
          totalSeat: "",
          imageOfTheBus: "image.png",
        });
      }
    } catch (error) {
      console.error("Error registering bus:", error);
      toast.error("Failed to register bus. " + error.message);
    }
  };

  useEffect(() => {
    refreshAgencyMembers(id);
  }, [id]);

  return (
    <>
      <div className="container my-5">
        <h3 className="mb-3">General Overview</h3>
        <div
          className="d-flex justify-content-around collapse navbar-collapse rounded-2"
          id="generalOverview"
          style={{ backgroundColor: "rgba(205, 234, 225, 1)" }}
        >
          <div className="px-2 py-4">
            <LifeBuoy />
            <p>6 Buses</p>
          </div>
          <div
            className="py-4 px-md-4 mx-md-2 py-4 border-start border-2"
            style={{ borderColor: "darkgreen" }}
          >
            <Flag />
            <p>3 Registered Routes</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2">
            <BookCheck />
            <p>200 Daily Passengers</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2">
            <DoorClosed />
            <p>9 Employees</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2">
            <Ticket />
            <p>4 Ticket Agents</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2">
            <SquareUserRound />
            <p>6 Drivers</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between">
          <h3>Registered Buses</h3>
          <div className="d-flex gap-3 mb-1">
            <button
              type="button"
              className="btn btn-bg mx-2 rounded"
              data-bs-toggle="modal"
              data-bs-target="#registerBusModal"
            >
              Register Bus
            </button>
            <div>
              <input
                type="search"
                className="form-control custom-search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
        <hr />
        <BusDetails />

        <div className="d-flex justify-content-end">
          <button className="btn btn-dark text-light rounded-2">
            Show more results
          </button>
        </div>

        {/* Modal Component */}
        <div
          className="modal fade"
          id="registerBusModal"
          tabIndex="-1"
          aria-labelledby="registerBusModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="registerBusModalLabel">
                  Register New Bus
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="busNumber" className="form-label">
                      Bus Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="busNumber"
                      name="busNumber"
                      value={formData.busNumber}
                      placeholder="Enter Bus Number"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="totalSeat" className="form-label">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalSeat"
                      name="totalSeat"
                      value={formData.totalSeat}
                      placeholder="Enter Total Seats"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="driverId" className="form-label">
                      Driver
                    </label>
                    <select
                      name="driverId"
                      className="form-select"
                      aria-label="Select Driver"
                      value={formData.driverId}
                      onChange={handleChange}
                    >
                      <option value="">Select Driver</option>
                      {agencyMembers &&
                        agencyMembers.map((member, index) =>
                          member.role === "Driver" ? (
                            <option key={index} value={member._id}>
                              {member.fullName}
                            </option>
                          ) : null
                        )}
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-bg">
                      Register Bus
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
