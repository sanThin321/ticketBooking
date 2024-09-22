import { useState } from "react";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { AdminBooking } from "../../components/Cards/AdminBooking";

export const AdminBookings = () => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <AdminHeader
        toggleFilters={() => setShowFilters((prev) => !prev)}
        title="Manage Booking"
      />
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            <AdminBooking/>
            <AdminBooking/>
            <AdminBooking/>
          </div>
          <div
            className={`p-3 border border-secondary-subtle rounded ${
              showFilters ? "d-block" : "d-none"
            }`}
          >
            <h5>Filters</h5>
            <hr />
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Filter by name and email"
              >
                <option defaultValue>Name</option>
                <option value="1">Name</option>
                <option value="2">Email</option>
              </select>
            </div>

            <div className="mb-3"></div>

            <div>
              <select
                className="form-select"
                aria-label="Filter by name and email"
              >
                <option defaultValue>Acency</option>
                <option value="1">JD Transport</option>
                <option value="2">Pelyab Transport</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
