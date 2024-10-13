import Ticket from "../model/Ticket.js";

export const getallTicket = async (req, res) => {
    try {
      const tickets = await Ticket.find(); 
      if (!tickets.length) {
        return res.status(404).json({ message: "No tickets found" });
      }
      return res.status(200).json(tickets); 
    } catch (err) {
      return res.status(500).json({ message: "Could not retrieve tickets", error: err.message });
    }
  };
  export const getTicket= async (req, res) => {
    try {
      const { ticket_id } = req.params; 
      const ticket = await Ticket.findById(ticket_id); 
  
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      return res.status(200).json(ticket);
    } catch (err) {
      return res.status(500).json({ message: "Could not retrieve the ticket", error: err.message });
    }
  };

// Update booked seats and availableSeats
export const updateBookedTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params; // Ticket ID from request params
    const { seatsBooked } = req.body; // Array of booked seats from request body

    if (!seatsBooked || !seatsBooked.length) {
      return res.status(400).json({ message: "Please provide seats to book." });
    }

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    // Check if the requested seats are available
    if (ticket.availableSeats < seatsBooked.length) {
      return res.status(400).json({ message: "Not enough available seats." });
    }

    // Update the booked array and subtract availableSeats
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticket_id,
      {
        $push: { booked: { $each: seatsBooked } }, // Add seats to the booked array
        $inc: { availableSeats: -seatsBooked.length }, // Decrease the available seats
      },
      { new: true } // Return the updated ticket
    );

    return res.status(200).json(updatedTicket); // Send back the updated ticket
  } catch (err) {
    return res.status(500).json({ message: "Error updating booked tickets", error: err.message });
  }
};
