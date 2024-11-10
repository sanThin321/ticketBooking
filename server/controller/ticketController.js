import { RegisterBus } from "../model/agencyModel.js";
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
      busId,
      totalSeat,
    } = req.body;
    
    const newTicket = new Ticket({
      agencyId,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      bus: busId,
      availableSeats: 0,
    });

    const ticket = new Ticket(newTicket);
    await ticket.save();
    res.status(201).json({ message: "Ticket registered successfully" });
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: "Error registering ticket", error });
  }
};

const getallTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({ path: "agencyId", select: "agencyName" })
      .populate({ path: "bus", select: ["totalSeat", "busNumber"]});
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
      .populate({ 
        path: "bus", 
        select: ["totalSeat", "busNumber", "driverId"],
        populate: { path: "driverId", select: "fullName" } // Populating driverId with fullName
      });

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

    if (ticket.availableSeats < seatsBooked.length) {
      return res.status(400).json({ message: "Not enough available seats." });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticket_id,
      {
        $push: { booked: { $each: seatsBooked } },
        $inc: { availableSeats: -seatsBooked.length },
      },
      { new: true }
    );

    return res.status(200).json(updatedTicket);
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
    const { from, to, departureTime, arrivalTime, price, busId } = req.body;

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update ticket fields if they are present in the request body
    if (from) ticket.from = from;
    if (to) ticket.to = to;
    if (departureTime) ticket.departureTime = departureTime;
    if (arrivalTime) ticket.arrivalTime = arrivalTime;
    if (price) ticket.price = price;

    // Check and update bus details if `busId` is provided
    if (busId) {
      const bus = await RegisterBus.findById(busId); // Find the bus by ID
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      ticket.bus = busId; // Set the bus reference
    }

    // Save the updated ticket
    await ticket.save();
    return res.status(200).json({ message: "Ticket updated successfully", ticket });

  } catch (error) {
    res.status(500).json({ message: "Error updating Ticket", error: error.message });
  }
};

const bookedDetail = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId).select("booked");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    res.status(200).json({ bookedDetails: ticket.booked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addTicket,
  delateTicket,
  updateTicket,
  updateBookedTicket,
  getTicket,
  getallTicket,
  bookedDetail,
};
