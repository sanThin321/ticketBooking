import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price:{type:Number, required:true},
  agnecy: { type: String, required: true },
  agencyLogo: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  booked: [],
  date:{type:String, required:true}
});

const Ticket = mongoose.model("Ticket", ticketSchema, "Ticket");
export default Ticket;
