import { Armchair } from "lucide-react";
import { Seats } from "../../components/Seats";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../context/Store";

export const BookingSeats = () => {
  const { refreshTickets} = useStore()
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

  const handleDetailChange = (seatNumber, name, cid) => {
    setSeatDetails((prevDetails) => ({
      ...prevDetails,
      [seatNumber]: { name, cid },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!ticket._id) {
      console.error("Ticket ID is missing.");
      return;
    }

    const bookedSeats = Array.from(selectedSeats).map((seatNumber) => ({
      seatNumber,
      name: seatDetails[seatNumber]?.name || "",
      cid: seatDetails[seatNumber]?.cid || "",
    }));

    try {
      const response = await axios.put(
        `http://localhost:4004/pelrizhabtho/tickets/${ticket._id}/book`,
        { seatsBooked: bookedSeats}
      );

      if (response.status === 200) {
        toast.success("Seats booked successfully!");
      
        setTimeout(() => {
          window.location.reload(); 
        }, 1000);
      
        handleCancel();
      }
      
      
    } catch (error) {
      console.error("Error booking seats:", error.message);
    }

    console.log("Selected Seats with User Details:", bookedSeats);
  };

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

  useEffect(() => {
    if (id) {
      getTicketDetails(id);
    }
  }, [id]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="rounded border p-3">
            <h5>
              <strong>Book Seat</strong>
            </h5>
            <div className="d-flex justify-content-between">
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
                    <p>{ticket.departureTime}</p>
                    <p>{ticket.arrivalTime}</p>
                  </div>
                </div>
                <div>
                  <p>Price</p>
                  <h5>Nu. {ticket.price}</h5>
                </div>
              </div>
              <div className="d-flex gap-5 border-left ps-3">
                <div>
                  <p>Available</p>
                  <Armchair color="#8DD3BB" size={50} />
                </div>
                <div>
                  <p>Selected</p>
                  <Armchair color="#AFAFAF" size={50} />
                </div>
                <div>
                  <p>Booked</p>
                  <Armchair color="#FF6F61" size={50} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 mt-4">
            <form onSubmit={handleSubmit}>
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
                        className="form-control mb-2"
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
                        className="form-control mb-2"
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
        <div className="col-4 px-0">
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
