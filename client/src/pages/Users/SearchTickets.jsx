import { useState, useEffect } from "react";
import { BookTicketsHeader } from "../../components/PageHeaders/BookTicketsComponent";
import { Filter } from "../../components/User/Filter";
import { Ticket } from "../../components/User/Ticket";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/Store";

export const SearchTickets = () => {
  const { tickets, refreshTickets } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pfrom = searchParams.get("from");
  const pto = searchParams.get("to");
  const pdate = searchParams.get("date");

  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [visibleTickets, setVisibleTickets] = useState(3);
  const [from, setFrom] = useState(pfrom ? pfrom : "From");
  const [to, setTo] = useState(pto ? pto : "To");
  const [date, setDate] = useState(pdate ? pdate : "Date");

  const filterTickets = (searchFrom, searchTo, searchDate) => {
    console.log("search date: " + searchDate);

    const filtered = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket?.departureTime)
        .toISOString()
        .split("T")[0];
      const formattedSearchDate = new Date(searchDate && searchDate)
        .toISOString()
        .split("T")[0];

      return (
        (!searchFrom ||
          ticket.from.toLowerCase() === searchFrom.toLowerCase()) &&
        (!searchTo || ticket.to.toLowerCase() === searchTo.toLowerCase()) &&
        (!searchDate || ticketDate == formattedSearchDate)
      );
    });

    setFilteredTickets(filtered);
  };

  const handleSearchTickets = (selectedFrom, selectedTo, selectedDate) => {
    setFrom(selectedFrom);
    setTo(selectedTo);
    setDate(selectedDate);
    filterTickets(selectedFrom, selectedTo, selectedDate);
  };

  const loadMoreTickets = () => {
    setVisibleTickets((prevVisible) => prevVisible + 3);
  };

  const handleTicketClick = (ticketId) => {
    navigate(`/booking-tickets/${ticketId}`);
  };

  useEffect(() => {
    // Refresh tickets on load
    refreshTickets();
  }, [refreshTickets]);

  // This effect ensures search is triggered when the query params change
  useEffect(() => {
    if (pfrom || pto || pdate) {
      handleSearchTickets(pfrom || "From", pto || "To", pdate || "Date");
    }
  }, [pfrom, pto, pdate]); // Runs whenever query parameters change

  return (
    <>
      <BookTicketsHeader
        from={from}
        to={to}
        inputDate={date}
        onSearch={handleSearchTickets}
      />

      <div className="container mt-5 pb-5">
        <div className="row">
          {/* <div className="col-4">
            <Filter />
          </div> */}
          <div className="col border-left">
            {filteredTickets.length === 0 ? (
              <div className="text-center">
                <h5>No ticket available.</h5>
              </div>
            ) : (
              filteredTickets.slice(0, visibleTickets).map((ticket, index) => (
                <div key={index} onClick={() => handleTicketClick(ticket._id)}>
                  <Ticket key={index} ticket={ticket} />
                </div>
              ))
            )}
            <hr />
            {visibleTickets < filteredTickets.length && (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-dark text-white px-3"
                  onClick={loadMoreTickets}
                >
                  Load more results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
