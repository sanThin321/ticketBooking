import { useEffect, useState } from "react";
import { AgencyBooking } from "../../components/Cards/AgencyBooking";
import RegisterTicketBtn from "../../components/RegisterTicketBtn";
import { useStore } from "../../context/Store";

export const AgencyBookings = () => {
  const agencyId = localStorage.getItem("agencyId");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Single search term
  const [filteredTickets, setFilteredTickets] = useState([]); // Filtered tickets

  const { refreshAgencyTickets, agencyTickets } = useStore();

  useEffect(() => {
    refreshAgencyTickets(agencyId);
  }, [agencyId]);

  // Filter tickets based on the search term
  useEffect(() => {
    const filtered = agencyTickets.filter((ticket) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        ticket.from.toLowerCase().includes(searchLower) || 
        ticket.to.toLowerCase().includes(searchLower)
      );
    });
    setFilteredTickets(filtered);
  }, [searchTerm, agencyTickets]);

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <>
      <div className="container mt-3 d-flex align-items-center justify-content-between bg-white border p-3 rounded mb-3">
        <h4 className="mb-0">Manage Tickets</h4>
        <div className="d-flex gap-3 align-items-center">
          <RegisterTicketBtn />
          <div className="d-flex align-items-center">
            <input
              type="search"
              className="form-control custom-search"
              placeholder="Search by From/To"
              aria-label="Search by From/To"
              value={searchTerm} // Bind input to state
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
        </div>
      </div>
      <div className="container px-0">
        <div className="d-flex justify-content-between gap-4">
          <div className="w-100">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <AgencyBooking
                  key={index}
                  data={ticket}
                  onEditClick={handleEditClick}
                  selectedTicket={selectedTicket}
                />
              ))
            ) : (
              <div className="text-center mt-5">
                <h5>No tickets found.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
