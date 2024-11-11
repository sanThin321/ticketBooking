import mongoose from "mongoose";

const bankDetails = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nameOnCard: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankService: { type: String, required: true },
});
const Bank = mongoose.model("bankDetails", bankDetails);
export { Bank };
const PaymentSchema = new mongoose.Schema({
  bankDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  seat: { type: String, required: true },
  agency: { type: String, required: true },
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
