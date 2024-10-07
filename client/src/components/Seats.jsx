import React, { useState } from "react";
import { Armchair } from "lucide-react";

export const Seats = ({ onSeatSelection, selectedSeats }) => {
  const seatNumbers = Array.from({ length: 24 }, (_, index) => index + 1);
//   const [selectedSeats, setSelectedSeats] = useState(new Set());

//   const handleSeatClick = (seatNumber) => {
//     const updatedSelectedSeats = new Set(selectedSeats);
//     if (updatedSelectedSeats.has(seatNumber)) {
//       updatedSelectedSeats.delete(seatNumber); // Deselect the seat
//     } else {
//       updatedSelectedSeats.add(seatNumber); // Select the seat
//     }
//     setSelectedSeats(updatedSelectedSeats);
//   };

  const columns = [];
  for (let i = 0; i < seatNumbers.length; i += 6) {
    columns.push(seatNumbers.slice(i, i + 6));
  }

  return (
    <div className="d-flex justify-content-end">
      {columns.map((columnSeats, colIndex) => (
        <div
          className={`${
            colIndex < 2 ? "me-0" : colIndex === 2 ? "ms-5 ps-3" : "ms-0"
          }`}
          key={colIndex}
        >
          {columnSeats.map((seatNumber) => (
            <button
              className="btn d-flex flex-column align-items-center mb-2"
              key={seatNumber}
              onClick={() => onSeatSelection(seatNumber)}
            >
              <h5 className="mb-0">
                <strong>{seatNumber}</strong>
              </h5>
              <Armchair color={selectedSeats.has(seatNumber) ? "#AFAFAF" : "#8DD3BB"} size={50} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
