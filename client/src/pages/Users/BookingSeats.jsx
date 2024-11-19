import { Armchair } from "lucide-react";
import { Seats } from "../../components/Seats";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const storedData = localStorage.getItem('user'); 
const userId = JSON.parse(storedData).id;
import { loadStripe } from '@stripe/stripe-js';

export const BookingSeats = () => {
  const { id } = useParams();
  const [seatDetails, setSeatDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [ticket, setTicket] = useState({});

  const handleSeatSelection = (seatNumber) => {
    const updatedSelectedSeats = new Set(selectedSeats);
    if (updatedSelectedSeats.has(seatNumber)) {
      updatedSelectedSeats.delete(seatNumber);
      const newSeatDetails = { ...seatDetails };
      delete newSeatDetails[seatNumber];
      setSeatDetails(newSeatDetails);
    } else {
      updatedSelectedSeats.add(seatNumber);
    }
    setSelectedSeats(updatedSelectedSeats);
  };

  const handleDetailChange = (seatNumber, name, cid, contactNo) => {
    setSeatDetails((prevDetails) => ({
      ...prevDetails,
      [seatNumber]: { name, cid, contactNo },
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!ticket._id) {
  //     console.error("Ticket ID is missing.");
  //     return;
  //   }

  //   const bookedSeats = Array.from(selectedSeats).map((seatNumber) => ({
  //     seatNumber,
  //     name: seatDetails[seatNumber]?.name || "",
  //     cid: seatDetails[seatNumber]?.cid || "",
  //     contactNo: seatDetails[seatNumber]?.contactNo || "",
  //   }));

  //   for (let seat of bookedSeats) {
  //     if (!seat.name || !seat.cid || !seat.contactNo) {
  //       toast.error("All fields must be filled for each selected seat.");
  //       return;
  //     }
  //   }

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:4004/pelrizhabtho/agency/tickets/${ticket._id}/book`,
  //       { seatsBooked: bookedSeats }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Seats booked successfully!");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);

  //       handleCancel();
  //     }
  //   } catch (error) {
  //     console.error("Error booking seats:", error.message);
  //   }

  //   console.log("Selected Seats with User Details:", bookedSeats);
  // };

  const handleCancel = () => {
    setSelectedSeats(new Set());
    setSeatDetails({});
  };

  const getTicketDetails = async (ticketId) => {
    try {
      const response = await axios.get(
        `http://localhost:4004/pelrizhabtho/agency/getticket/${ticketId}`
      );

      console.log("ticket: " + response.data);
      if (response.status === 200) {
        setTicket(response.data);
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error.message);
    }
  };

  const departureDateTime = new Date(ticket.departureTime).toLocaleString([], {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Format the arrival date and time to a human-readable format
  const arrivalDateTime = new Date(ticket.arrivalTime).toLocaleString([], {
    year: "numeric", // Full year (e.g., 2024)
    month: "long", // Full month name (e.g., November)
    day: "2-digit", // Day of the month (e.g., 10)
    hour: "2-digit", // Hour in 2-digit format (e.g., 06)
    minute: "2-digit", // Minute in 2-digit format (e.g., 08)
    hour12: true, // AM/PM format
  });

  const makePayment = async (event) => {
    event.preventDefault();
    const bookedSeats = Array.from(selectedSeats).map((seatNumber) => ({
      seatNumber,
      name: seatDetails[seatNumber]?.name || "",
      cid: seatDetails[seatNumber]?.cid || "",
      contactNo: seatDetails[seatNumber]?.contactNo || "",
      price: ticket.price,
      userId
    }));

    // Check if all necessary fields are filled
    for (let seat of bookedSeats) {
      if (!seat.name || !seat.cid || !seat.contactNo) {
        toast.error("All fields must be filled for each selected seat.");
        return;
      }
    }

    try {
      const stripe = await loadStripe("pk_test_51QMr5UChEc4w1h3ZJle3FaPE2IBx9kchCGineAwFcpzem5RBBrOLG2Q5oMfWCZy5UIisBkBz5GHRgJqLG1JLgE2100I533kKGm");

      if (!stripe) {
        throw new Error("Stripe failed to load.");
      }

      const response = await axios.post(
        "http://localhost:4004/pelrizhabtho/create-checkout-session",
        { bookedDetails: bookedSeats },
        { headers: { "Content-Type": "application/json" } }
      );

      const session = response.data;
      await bookSeatsAfterPayment(bookedSeats);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });


      if (result.error) {
        console.error("Error during redirect:", result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error.message || error);
    }
  };

  // Function to book seats after payment
  const bookSeatsAfterPayment = async (bookedSeats) => {
    try {
      const response = await axios.put(
        `http://localhost:4004/pelrizhabtho/agency/tickets/${ticket._id}/book`,
        { seatsBooked: bookedSeats }
      );

      if (response.status === 200) {
        console.log("Seats booked successfully!");
      }
    } catch (error) {
      console.error("Error booking seats:", error.message);
    }
  };


  useEffect(() => {
    if (id) {
      getTicketDetails(id);
    }
  }, [id]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="rounded border p-3">
            <h5>
              <strong>Book Seat</strong>
            </h5>
            <div className="d-flex flex-column justify-content-between">
              <div className="d-flex gap-3">
                <div
                  className="d-flex gap-3 pe-3"
                  style={{ borderRight: "1px solid #D7E2EE" }}
                >
                  <div
                    className="pe-3"
                    style={{ borderRight: "1px solid #D7E2EE" }}
                  >
                    <p>Departure Time</p>
                    <p>Arrival Time</p>
                  </div>
                  <div>
                    <p>{departureDateTime}</p>
                    <p>{arrivalDateTime}</p>
                  </div>
                </div>
                <div>
                  <p>Price</p>
                  <h5>Nu. {ticket.price}</h5>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between ps-3">
                <div>
                  <p className="mb-0">Available</p>
                  <Armchair color="#8DD3BB" size={45} />
                </div>
                <div>
                  <p className="mb-0">Selected</p>
                  <Armchair color="#AFAFAF" size={45} />
                </div>
                <div>
                  <p className="mb-0">Booked</p>
                  <Armchair color="#FF6F61" size={45} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 mt-4">
            <form onSubmit={makePayment}>
              <div>
                <h5>Enter your details:</h5>
                {selectedSeats.size === 0 ? <p>Select a seat.</p> : null}
              </div>
              <div className="mt-3">
                {Array.from(selectedSeats).map((seatNumber) => (
                  <div key={seatNumber} className="mb-3 border p-3 rounded">
                    <label className="mb-2">Seat no {seatNumber}:</label>
                    <div className="d-flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={seatDetails[seatNumber]?.name || ""}
                        onChange={(e) =>
                          handleDetailChange(
                            seatNumber,
                            e.target.value,
                            seatDetails[seatNumber]?.cid
                          )
                        }
                        className="form-control mb-2 custom-search"
                      />
                      <input
                        type="number"
                        placeholder="Enter CID"
                        value={seatDetails[seatNumber]?.cid || ""}
                        onChange={(e) =>
                          handleDetailChange(
                            seatNumber,
                            seatDetails[seatNumber]?.name,
                            e.target.value
                          )
                        }
                        min={0}
                        className="form-control mb-2 custom-search"
                      />
                      <input
                        type="number"
                        placeholder="Contact Number"
                        value={seatDetails[seatNumber]?.contactNo || ""}
                        min={0}
                        onChange={(e) =>
                          handleDetailChange(
                            seatNumber,
                            seatDetails[seatNumber]?.name,
                            seatDetails[seatNumber]?.cid,
                            e.target.value
                          )
                        }
                        className="form-control mb-2 custom-search"
                      />
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-end mt-3">
                  {selectedSeats.size !== 0 ? (
                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-outline-secondary px-4"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>

                      <button className="btn btn-dark px-4" type="submit">
                        Proceed
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-5 px-0">
          <Seats
            booked={ticket.booked}
            onSeatSelection={handleSeatSelection}
            selectedSeats={selectedSeats}
          />
        </div>
      </div>
    </div>
  );
};
