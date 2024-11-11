import axios from "axios";
import React, { useState } from "react";
import { useStore } from "../context/Store";
import { toast } from "react-toastify";

const AddMemberBtn = () => {
  const id = localStorage.getItem("agencyId");
  const { refreshAgencyMembers } = useStore();

  const [formData, setFormData] = useState({
    agencyId: id ? id : "",
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
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
      if (
        formData.fullName === "" ||
        formData.email === "" ||
        formData.phoneNumber === "" ||
        formData.role === ""
      ) {
        toast.error("Fields cannot be empty.");
        return;
      }
  
      if (formData.role === "Ticket Agent" && password === "") {
        toast.error("Password canot be empty.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/agency/registermember",
        formData
      );
  
      if (response.status === 201) {
        refreshAgencyMembers(id);
        toast.success("Member registered successfully.")
      }
      
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "",
      });
    } catch (error) {
      console.log("Error adding member. " + error.message)
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
        Register member
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
                Register Member
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="fullName">Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="text"
                  id="fullName"
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="email"
                  id="email"
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactNo">Contact No</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control custom-search"
                  type="text"
                  id="contactNo"
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="form-select">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select custom-search"
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

export default AddMemberBtn;
