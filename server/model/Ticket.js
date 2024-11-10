import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: Date, required: true }, 
  arrivalTime: { type: Date, required: true },    
  price: { type: Number, required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Register_Bus', required: true },
  availableSeats: { type: Number, required: false },
  booked: []
});

const Ticket = mongoose.model("Ticket", ticketSchema, "Ticket");
export default Ticket;
