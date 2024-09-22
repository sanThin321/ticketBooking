import { useState } from "react";
import { PaymentDetail } from "../../components/Cards/PaymentDetail";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";

export const AdminPaymentDetails = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <AdminHeader
        toggleFilters={() => setShowFilters((prev) => !prev)}
        title="Payment Details"
      />
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            <PaymentDetail />
            <PaymentDetail />
            <PaymentDetail />
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
