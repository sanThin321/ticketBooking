import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price:{type:Number, required:true},
  agencyId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  busNumber:{type:String,required:true},
  bus:{type:mongoose.Schema.Types.ObjectId,ref:'Register_Bus',required:true},
  availableSeats: { type: Number, required: true },
  booked: [],
  date:{type:String, required:true}
});

const Ticket = mongoose.model("Ticket", ticketSchema, "Ticket");
export default Ticket;
