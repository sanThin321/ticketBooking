import { useState } from "react";
import { PencilLine } from "lucide-react";
import { useAuth } from "../../auth/auth";
import axios from "axios";
import { toast } from "react-toastify";
import loader from "../../assets/loader.gif";

export const Account = () => {
  const { user, refreshUser } = useAuth();
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    phoneNumber: user.phoneNumber,
  });

  const [originalData, setOriginalData] = useState({ ...formData }); // Store original values

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    setOriginalData({ ...formData }); // Save original values before editing
  };

  const handleCancel = (field) => {
    setFormData({ ...originalData }); // Revert changes
    setEditMode((prev) => ({ ...prev, [field]: false })); // Exit edit mode
  };

  const handleUpdate = async (field) => {
    try {
      let res = "";

      switch (field) {
        case "name":
          res = await axios.put(
            `http://localhost:4004/pelrizhabtho/update-names/${user._id}`,
            formData
          );
          break;
        case "email":
          res = await axios.put(
            `http://localhost:4004/pelrizhabtho/update-email/${user._id}`,
            formData
          );
          break;
        case "password":
          res = await axios.put(
            `http://localhost:4004/pelrizhabtho/update-password/${user._id}`,
            formData
          );
          break;
        case "phone":
          res = await axios.put(
            `http://localhost:4004/pelrizhabtho/update-phone/${user._id}`,
            formData
          );
          break;
      }

      if (res.status === 200) {
        toast.success(`${field} updated successfully!`);
        refreshUser();
        toggleEditMode(field);
      }
    } catch (error) {
      toast.error(`Failed to update ${field}.`);
    }
  };

  return (
    <div>
      <h3 className="mt-4">Account</h3>
      <div className="bg-white border rounded my-3 mb-5 p-4">
        {user ? (
          <div className="mb-3">
            <label>Name</label>
            <div className="d-flex justify-content-between align-items-center">
              {editMode.name ? (
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2 custom-search"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    className="form-control custom-search"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    autoComplete="off"
                  />
                </div>
              ) : (
                <h5>{`${user.firstName} ${user.lastName}`}</h5>
              )}
              {editMode.name ? (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-bg"
                    onClick={() => handleUpdate("name")}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleCancel("name")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-outline-dark d-flex gap-2 align-items-center"
                  onClick={() => toggleEditMode("name")}
                >
                  <PencilLine size={18} />
                  Change
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <img src={loader} />
          </div>
        )}

        <div className="mb-3">
          <label>Email</label>
          <div className="d-flex justify-content-between align-items-center">
            {editMode.email ? (
              <div>
                <input
                  type="email"
                  className="form-control custom-search"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter new email"
                  autoComplete="off"
                />
              </div>
            ) : (
              <h5>{user.email}</h5>
            )}
            {editMode.email ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-bg"
                  onClick={() => handleUpdate("email")}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleCancel("email")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-dark d-flex gap-2 align-items-center"
                onClick={() => toggleEditMode("email")}
              >
                <PencilLine size={18} />
                Change
              </button>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="d-flex justify-content-between align-items-center">
            {editMode.password ? (
              <div>
                <input
                  type="password"
                  className="form-control custom-search"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  autoComplete="off"
                />
              </div>
            ) : (
              <h5>**********</h5>
            )}
            {editMode.password ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-bg"
                  onClick={() => handleUpdate("password")}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleCancel("password")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-dark d-flex gap-2 align-items-center"
                onClick={() => toggleEditMode("password")}
              >
                <PencilLine size={18} />
                Change
              </button>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <div className="d-flex justify-content-between align-items-center">
            {editMode.phone ? (
              <div>
                <input
                  type="text"
                  className="form-control custom-search"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter new phone number"
                />
              </div>
            ) : (
              <h5>{user.phoneNumber}</h5>
            )}
            {editMode.phone ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-bg"
                  onClick={() => handleUpdate("phone")}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleCancel("phone")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-dark d-flex gap-2 align-items-center"
                onClick={() => toggleEditMode("phone")}
              >
                <PencilLine size={18} />
                Change
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
