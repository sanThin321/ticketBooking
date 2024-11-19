import { ChevronRight, Mail, Phone } from "lucide-react";
import Driver from "../../assets/Driver.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../../context/Store";

export const UserDetail = ({ data, onEditClick, selectedUser }) => {
  const aId = localStorage.getItem("agencyId")
  const { refreshAllMembers } = useStore();
  const [formData, setFormData] = useState({
    agencyId: selectedUser?.agencyId || "",
    fullName: selectedUser?.fullName || "",
    email: selectedUser?.email || "",
    phoneNumber: selectedUser?.phoneNumber || "",
    role: selectedUser?.role || "",
    password: selectedUser?.password || "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        agencyId: selectedUser.agencyId,
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4004/pelrizhabtho/agency/updatemember/${selectedUser?._id}`,
        formData
      );

      if (res.status === 200) {
        toast.success("User details updated successfully.");
        refreshAgencyMembers(aId);
      }
    } catch (error) {
      toast.error("Unable to update. " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4004/pelrizhabtho/admin/deleteUser/${id}`
      );

      if (res.status === 200) {
        toast.success("User deleted successfully.");
        refreshAllMembers();
      }
    } catch (error) {
      toast.error("Unable to delete user.");
    }
  };

  return (
    <div className="hover bg-white rounded border py-2 px-4 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <div
            className="d-flex gap-3 pe-5 align-items-center"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={Driver}
                className="rounded mx-auto d-block"
                alt="driver default icon"
                width={70}
              />
            </div>
            <div style={{ width: "12rem" }}>
              <h5 className="mb-0">{data.fullName}</h5>
              <p>{data.role}</p>
            </div>
          </div>
          <div className="d-flex flex-row gap-4 gap-lg-5 ms-3">
            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Phone color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">
                  <small>Contact No</small>
                </p>
                <p className="mb-0">{data.phoneNumber}</p>
              </div>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#EBF6F2" }}
              >
                <Mail color="#8DD3BB" size={25} />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fs-6">
                  <small>Email</small>
                </p>
                <p className="mb-0">{data.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {/* button  */}
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
                    onClick={() => handleDelete(selectedUser._id)}
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
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter details"
                        className="form-control custom-search"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phoneNumber">Contact Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter contact number"
                        className="form-control custom-search"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        className="form-control custom-search"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-select"
                        aria-label="Select Role"
                      >
                        <option value="">Select Role</option>
                        <option value="Driver">Driver</option>
                        <option value="Ticket Agent">Ticket Agent</option>
                      </select>
                    </div>

                    {formData.role === "Ticket Agent" && (
                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control custom-search"
                          type="password"
                          id="password"
                        />
                      </div>
                    )}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn"
                        data-bs-dismiss="modal"
                      >
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
      </div>
    </div>
  );
};
