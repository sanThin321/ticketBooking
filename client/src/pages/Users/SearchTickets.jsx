import { useState } from "react"; // Import useState
import { BookTicketsHeader } from "../../components/PageHeaders/BookTicketsComponent";
import { Filter } from "../../components/User/Filter";
import { Ticket } from "../../components/User/Ticket";

// Mock data (added more tickets for demo)
const tickets = [
  {
    id: 1,
    agency: "JD Transport",
    price: 445,
    from: "Thimphu",
    departureTime: "12:00 pm",
    to: "Phuentsholing",
    arrivalTime: "6:00 pm",
    totalSeats: 24,
    availableSeats: 10,
  },
  {
    id: 2,
    agency: "Express Bus",
    price: 380,
    from: "Paro",
    departureTime: "10:00 am",
    to: "Gelephu",
    arrivalTime: "3:00 pm",
    totalSeats: 40,
    availableSeats: 5,
  },
  {
    id: 3,
    agency: "Royal Transport",
    price: 500,
    from: "Haa",
    departureTime: "9:00 am",
    to: "Samdrup Jongkhar",
    arrivalTime: "7:00 pm",
    totalSeats: 30,
    availableSeats: 18,
  },
  {
    id: 4,
    agency: "Mountain Transit",
    price: 350,
    from: "Bumthang",
    departureTime: "8:00 am",
    to: "Trongsa",
    arrivalTime: "10:00 am",
    totalSeats: 20,
    availableSeats: 6,
  },
  {
    id: 5,
    agency: "Valley Transport",
    price: 600,
    from: "Punakha",
    departureTime: "5:00 pm",
    to: "Thimphu",
    arrivalTime: "7:30 pm",
    totalSeats: 25,
    availableSeats: 12,
  }
];

export const SearchTickets = () => {
  // Use state to control how many tickets are shown
  const [visibleTickets, setVisibleTickets] = useState(3);

  // Function to load more tickets
  const loadMoreTickets = () => {
    setVisibleTickets((prevVisible) => prevVisible + 3); // Increase the number of visible tickets by 3
  };

  return (
    <>
      <BookTicketsHeader />
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-4">
            <Filter />
          </div>
          <div className="col border-left">
            {tickets.slice(0, visibleTickets).map((ticket) => (
              <Ticket ticket={ticket} key={ticket.id} />
            ))}
            <hr />
            {visibleTickets < tickets.length && (
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
