import React from "react";
import { Armchair } from "lucide-react";

export const Seats = ({ onSeatSelection, selectedSeats, booked = [] }) => {
  const seatNumbers = Array.from({ length: 24 }, (_, index) => index + 1);

  const columns = [];
  for (let i = 0; i < seatNumbers.length; i += 6) {
    columns.push(seatNumbers.slice(i, i + 6));
  }

  const isSeatBooked = (seatNumber) =>
    booked.some((seat) => seat.seatNumber === seatNumber);

  return (
    <div className="d-flex justify-content-end">
      {columns.map((columnSeats, colIndex) => (
        <div
          className={`${
            colIndex < 2 ? "me-0" : colIndex === 2 ? "ms-5 ps-3" : "ms-0"
          }`}
          key={colIndex}
        >
          {columnSeats.map((seatNumber) => {
            const isBooked = isSeatBooked(seatNumber); 
            const isSelected = selectedSeats.has(seatNumber); 

            return (
              <button
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                }}
                className="btn d-flex flex-column align-items-center mb-2"
                key={seatNumber}
                onClick={() => !isBooked && onSeatSelection(seatNumber)}
                disabled={isBooked}
              >
                <h5 className="mb-0">
                  <strong>{seatNumber}</strong>
                </h5>
                <Armchair
                  color={
                    isBooked ? "#FF6F61" : isSelected ? "#AFAFAF" : "#8DD3BB"
                  }
                  size={50}
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
