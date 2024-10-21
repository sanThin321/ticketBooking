import { useEffect, useState } from "react";
import { UserDetail } from "../../components/Cards/UserDetail";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { useStore } from "../../context/Store";

export const AdminUsers = () => {
  let id = localStorage.getItem("agencyId");
  const { agencyMembers, refreshAgencyMembers } = useStore();
  const [showFilters, setShowFilters] = useState(false);

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    console.log(id);
    refreshAgencyMembers(id);
  }, []);
  return (
    <>
      <AdminHeader
        toggleFilters={() => setShowFilters((prev) => !prev)}
        title="Manage Users"
      />
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            {agencyMembers.map((member, index) => {
              return <UserDetail key={index} data={member} />;
            })}
          </div>
          <div
            className={`p-3 border border-secondary-subtle rounded ${
              showFilters ? "d-block ease" : "d-none"
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
