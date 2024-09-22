import { Armchair } from "lucide-react";
import { Seats } from "../../components/Seats";
import React, { useState } from "react";

export const BookingSeats = () => {
  const [seatDetails, setSeatDetails] = useState({}); // Store seat selections with names and CIDs
  const [selectedSeats, setSelectedSeats] = useState(new Set()); // Track selected seats

  const handleSeatSelection = (seatNumber) => {
    const updatedSelectedSeats = new Set(selectedSeats);
    if (updatedSelectedSeats.has(seatNumber)) {
      updatedSelectedSeats.delete(seatNumber); // Deselect the seat
      const newSeatDetails = { ...seatDetails };
      delete newSeatDetails[seatNumber]; // Remove details if seat is deselected
      setSeatDetails(newSeatDetails);
    } else {
      updatedSelectedSeats.add(seatNumber); // Select the seat
    }
    setSelectedSeats(updatedSelectedSeats);
  };

  const handleDetailChange = (seatNumber, name, cid) => {
    setSeatDetails((prevDetails) => ({
      ...prevDetails,
      [seatNumber]: { name, cid }, // Update details for the specific seat
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Fix typo here
    console.log("Selected Seats with User Details:", seatDetails);
    // Additional logic for processing the form can be added here
  };

  const handleCancel = () => {
    setSelectedSeats(new Set()); // Clear selected seats
    setSeatDetails({}); // Clear seat details
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-8">
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
                    <p>Journey Time</p>
                  </div>
                  <div>
                    <p>12:00 PM</p>
                    <p>6:00 Hrs</p>
                  </div>
                </div>
                <div>
                  <p>Price</p>
                  <h5>Nu. 480</h5>
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
            onSeatSelection={handleSeatSelection}
            selectedSeats={selectedSeats}
          />
        </div>
      </div>
    </div>
  );
};
