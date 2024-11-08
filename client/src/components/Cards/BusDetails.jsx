import { Armchair, CalendarDays, ChevronRight, User } from "lucide-react";
import Bus from "../../assets/Bus.png";
import { useStore } from "../../context/Store";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const BusDetails = ({ data, onEditClick, selectedBus }) => {
  const aId = localStorage.getItem("agencyId");
  const { refreshAgencyBuses, agencyMembers, refreshAgencyMembers } =
    useStore();
  const [formData, setFormData] = useState({
    agencyId: selectedBus?.agencyId || "",
    driverId: selectedBus?.driverId.fullName || "",
    busNumber: selectedBus?.busNumber || "",
    totalSeat: selectedBus?.totalSeat || "",
    imageOfTheBus: selectedBus?.imageOfTheBus || "image.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Bus " + formData.driverId)
    try {
      const res = await axios.put(
        `http://localhost:4004/pelrizhabtho/agency/updatebus/${selectedBus?._id}`,
        formData
      );

      if (res.status === 200) {
        toast.success("Bus details updated successfully.");
        refreshAgencyBuses(aId);
      }
    } catch (error) {
      toast.error("Unable to update. " + error.message);
    }
  };

  useEffect(() => {
    if (selectedBus) {
      setFormData({
        agencyId: selectedBus.agencyId,
        driverId: selectedBus.driverId,
        busNumber: selectedBus.busNumber,
        totalSeat: selectedBus.totalSeat,
        imageOfTheBus: selectedBus.imageOfTheBus,
      });
    }
  }, [selectedBus]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4004/pelrizhabtho/agency/deletebus/${id}`
      );

      if (res.status === 200) {
        toast.success("Bus deleted successfully.");
        refreshAgencyBuses(aId);
      }
    } catch (error) {
      toast.error("Unable to delete bus.");
    }
  };

  useEffect(() => {
    refreshAgencyMembers(aId);
  }, [aId]);

  return (
    <div className="bg-white rounded py-3 px-4 mb-3 border hover">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div className="d-flex gap-3 pe-5 align-items-center">
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Bus}
                className="rounded mx-auto d-block"
                alt="bus default icons"
                width={100}
              />
            </div>
          </div>

          <div className="d-flex  gap-5 ms-3 pe-5">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <CalendarDays color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">
                  <small>Bus Number</small>
                </p>
                <p className="mb-0">{data.busNumber}</p>
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
                  <small>Total Seats</small>
                </p>
                <p className="mb-0">{data.totalSeat}</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <User color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6">
                  <small>Driver</small>
                </p>
                {data.driverId ? data.driverId.fullName : "N/A"}
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
        </div>
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
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-bg"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(selectedBus._id)}
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
              <h5 className="modal-title">Edit User Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="busNumber" className="form-label">
                    Bus Number
                  </label>
                  <input
                    type="text"
                    className="form-control custom-search"
                    id="busNumber"
                    name="busNumber"
                    autoComplete="off"
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
                  <button type="button" className="btn" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-bg"
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
