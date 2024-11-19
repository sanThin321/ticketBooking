import express from "express";
import {
  addTicket,
  bookedDetail,
  delateTicket,
  getallTicket,
  getTicket,
  updateBookedTicket,
  updateTicket,
  getTicketByUserId,
  getallTicketByAgency
} from "../controller/ticketController.js";
import {
  validateDriver,
  vaildBus,
  validateBus,
} from "../Middleware/vaildateItsfromagency.js";
import {
  registerMember,
  getAllMembers,
  updateMember,
  deleteMember,
  getAllDriver,
} from "../controller/memberController.js";
import { registerBus, getAllBus, updateBus, deleteBus } from "../controller/busController.js";
// import { createRouteWithSchedule } from "../controller/routeandschedule.js";
import { processPayment } from "../controller/paymentController.js";
const router = express.Router();

// Agency member
router.post("/registermember", registerMember);
router.put("/updatemember/:memberId", updateMember);
router.delete("/deletemember/:memberId", deleteMember);
router.get("/getallDriver", getAllDriver);
router.get("/allmembers/:agencyId", getAllMembers);

// Agency Bus
router.post("/registerbus", registerBus);
router.get("/getallbus/:agencyId", getAllBus);
router.put("/updatebus/:busId", updateBus);
router.delete("/deletebus/:busId", deleteBus);

router.post("/verify-payment", processPayment);

//ticket
// router.post("/addTicket", validateBus, addTicket);
router.post("/addTicket", addTicket);
router.get("/getallticket", getallTicket);
router.get("/getticket/:ticket_id", getTicket);
router.put("/tickets/:ticket_id/book", updateBookedTicket);
router.delete("/deleteTicket/:ticketId", delateTicket);
// router.put("/updateTicket/:ticketId", validateBus, updateTicket);
router.put("/updateTicket/:ticketId", updateTicket);

router.get("/ticketbooked/:ticketId/bookeddetails", bookedDetail);
router.get("/ticket/:userId", getTicketByUserId);
router.get("/getallTicketByagency/:agencyId",getallTicketByAgency)
export default router;
