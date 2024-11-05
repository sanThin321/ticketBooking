import Ticket from "../model/Ticket.js";

const addTicket = async (req, res) => {
  try {
    const {
      agencyId,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      busNumber,
      date,
    } = req.body;
    const newTicket = new Ticket({
      agencyId,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      busNumber,
      bus: req.busId,
      availableSeats: req.totalSeat,
      date,
    });
    const ticket = new Ticket(newTicket);
    await ticket.save();
    res.status(201).json({ message: "Member registered successfully" });
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: "Error registering member", error });
  }
};
const getallTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({ path: "agencyId", select: "agencyName" })
      .populate({ path: "bus", select: "totalSeat" });
    if (!tickets.length) {
      return res.status(404).json({ message: "No tickets found" });
    }
    return res.status(200).json(tickets);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not retrieve tickets", error: err.message });
  }
};
const getTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const ticket = await Ticket.findById(ticket_id)
      .populate({ path: "agencyId", select: "agencyName" })
      .populate({ path: "bus", select: "totalSeat" });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not retrieve the ticket", error: err.message });
  }
};

// Update booked seats and availableSeats
const updateBookedTicket = async (req, res) => {
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
    return res
      .status(500)
      .json({ message: "Error updating booked tickets", error: err.message });
  }
};
const delateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    await Ticket.findByIdAndDelete(ticketId);
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Ticket", error });
  }
};
const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { from, to, departureTime, arrivalTime, price, busNumber, date } =
      req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (from) ticket.from = from;
    if (to) ticket.to = to;
    if (departureTime) ticket.departureTime = departureTime;
    if (arrivalTime) ticket.arrivalTime = arrivalTime;
    if (price) ticket.price = price;
    if (busNumber) {
      ticket.busNumber = busNumber;
      ticket.bus = req.bus;
      ticket.availableSeats = req.totalSeat;
    }
    if (date) ticket.date = date;

    await ticket.save();
  } catch (error) {
    res.status(500).json({ message: "Error updating Ticket", error });
  }
};

export {
  addTicket,
  delateTicket,
  updateTicket,
  updateBookedTicket,
  getTicket,
  getallTicket,
};
