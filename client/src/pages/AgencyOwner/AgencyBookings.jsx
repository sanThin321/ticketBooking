import { useEffect, useState } from "react";
import { AdminHeader } from "../../components/PageHeaders/AdminHeader";
import { AgencyBooking } from "../../components/Cards/AgencyBooking";
import RegisterTicketBtn from "../../components/RegisterTicketBtn";
import { useStore } from "../../context/Store";

export const AgencyBookings = () => {
  const agencyId = localStorage.getItem("agencyId");  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const {refreshAgencyTickets, agencyTickets} = useStore();
  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  useEffect(() => {
    refreshAgencyTickets(agencyId);
  }, [agencyId]);

  useEffect(() => {

  }, [agencyTickets])

  return (
    <>
      <AdminHeader
        toggleFilters={() => setShowFilters((prev) => !prev)}
        title="Manage Booking"
        btn={<RegisterTicketBtn />}
      />
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            {agencyTickets.map((ticket, index) => {
              return <AgencyBooking key={index} data={ticket} onEditClick={handleEditClick} selectedTicket={selectedTicket} />;
            })}
          </div>
          <div
            className={`p-3 border border-secondary-subtle rounded ${showFilters ? "d-block" : "d-none"
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
