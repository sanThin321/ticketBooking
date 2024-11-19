import { ChevronRight, Mail, Phone } from "lucide-react";
import Passanger from "../../assets/passanger.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "../../context/Store";

export const Passangers = ({ data, onEditClick, selectedUser }) => {
const {refreshAllMembers} = useStore();
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
            className="d-flex gap-4 align-items-center"
            style={{ borderRight: "1px solid #D7E2EE" }}
          >
            <div className="rounded-2" style={{ border: "1px solid #8DD3BB" }}>
              <img
                src={data.userType === "Agency" ? data?.agencyLogo : Passanger }
                className="rounded mx-auto d-block"
                alt="driver default icon"
                width={70}
              />
            </div>
            <div style={{ width: "12rem" }}>
              <h5 className="mb-0">{data.firstName} {data.lastName}</h5>
              <p className="mb-0">{data.userType === "Customer" ? "User" : data.userType === "Agency" ? data?.agencyName : data.userType === "Driver" ? data?.agencyName : data?.agencyName}</p>
            </div>
          </div>
          <div className="d-flex flex-row gap-4 gap-lg-5 ">
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
        </div>
      </div>
    </div>
  );
};
