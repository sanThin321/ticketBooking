import { BusDetails } from "../../components/Cards/BusDetails";
import { useEffect, useState } from "react";
import { useStore } from "../../context/Store";
import axios from "axios";
import { toast } from "react-toastify";

export const AgencyOwnerDashboard = () => {
  const id = localStorage.getItem("agencyId");
  const {
    agencyMembers,
    refreshAgencyMembers,
    agencyBuses,
    refreshAgencyBuses,
  } = useStore();

  const [formData, setFormData] = useState({
    agencyId: id,
    driverId: "",
    busNumber: "",
    totalSeat: "",
    imageOfTheBus: "image.png",
  });

  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4004/pelrizhabtho/agency/registerbus",
        formData
      );

      if (res.status === 200) {
        toast.success("Bus registered successfully.");
        refreshAgencyBuses(id);
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
    refreshAgencyBuses(id);
    refreshAgencyMembers(id);
  }, [id]);

  const [selectedBus, setSelectedBus] = useState(null);

  const handleEditClick = (bus) => {
    setSelectedBus(bus);
  };

  // Filter buses based on search query
  const filteredBuses = agencyBuses?.filter((bus) =>
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container my-4 pb-4">
        <div className="d-flex justify-content-between bg-white border p-3 rounded mb-3">
          <h3 className="">Registered Buses</h3>
          <div className="d-flex gap-3">
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
                placeholder="Search by Bus Number"
                aria-label="Search"
                value={searchQuery} // Bind searchQuery state
                onChange={handleSearchChange} // Handle input change
              />
            </div>
          </div>
        </div>
        {filteredBuses?.map((bus, index) => {
          return (
            <BusDetails
              key={index}
              data={bus}
              onEditClick={handleEditClick}
              selectedBus={selectedBus}
            />
          );
        })}

        {/* Register Bus Modal */}
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
                      className="form-control custom-search"
                      id="busNumber"
                      autoComplete="off"
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
                      className="form-control custom-search"
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
                      className="form-select custom-search"
                      aria-label="Select Driver"
                      value={formData.driverId}
                      onChange={handleChange}
                    >
                      <option value="">Select Driver</option>
                      {agencyMembers.map((member, index) =>
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
                    <button type="submit" className="btn btn-bg" data-bs-dismiss="modal">
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
