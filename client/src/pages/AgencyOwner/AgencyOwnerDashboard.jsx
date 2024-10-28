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
import { useState } from "react";

export const AgencyOwnerDashboard = () => {
  const [formData, setFormData] = useState({
    busNumber: "",
    totalSeats: "",
    driver: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted: ", formData);
    alert("Bus Registered Successfully!");

    setFormData({
      busNumber: "",
      totalSeats: "",
      driver: "",
    });
  };
  return (
    <>
      <div className="container my-5">
        <div>
          <h3 className="mb-3">General Overview</h3>
        </div>
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
            className=" py-4 px-md-4  mx-md-2 py-4 border-start border-2 h-25 px-sm-0 mx-sm-0"
            style={{ borderColor: "darkgreen" }}
          >
            <Flag />
            <p>3 Registered Routes</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2 h-25 px-sm-0 mx-sm-0 ">
            <BookCheck />
            <p>200 Daily Passenger</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2 h-25 px-sm-0 mx-sm-0">
            <DoorClosed />
            <p>9 Employee</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2 h-25 px-sm-0 mx-sm-0">
            <Ticket />
            <p>4 Ticket Agents</p>
          </div>
          <div className="px-md-4 py-4 mx-md-2 border-start border-2 h-25 px-sm-0 mx-sm-0">
            <SquareUserRound />
            <p>6 Drivers</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between mb-2">
          <div className="justify-content-start">
            <h3>Registered Buses</h3>
          </div>

          <div className="d-flex gap-4 mb-3">
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
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
        </div>

        <div>
          <BusDetails />
        </div>
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
                {/* Your form inputs for registering the bus */}
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
                    <label htmlFor="totalSeats" className="form-label">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalSeats"
                      name="totalSeats"
                      value={formData.totalSeats}
                      placeholder="Enter Total Seats"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="driver" className="form-label">
                      Driver
                    </label>
                    <select
                      name="driver"
                      className="form-select"
                      aria-label="Select Driver"
                      value={formData.driver}
                      onChange={handleChange}
                    >
                      <option value="">Select Driver</option>
                      <option value="Pema">Pema</option>
                      <option value="Dorji">Dorji</option>
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
