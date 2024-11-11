import express from "express";
import {
  addTicket,
  bookedDetail,
  delateTicket,
  getallTicket,
  getTicket,
  updateBookedTicket,
  updateTicket,
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
  getDriverCount,
} from "../controller/memberController.js";
import { getAllBuses, registerBus, getBusCount } from "../controller/busController.js";
// import { createRouteWithSchedule } from "../controller/routeandschedule.js";
import { processPayment } from "../controller/paymentController.js";
const router = express.Router();

// Agency member
router.post("/registermember", registerMember);
router.put("/updatemember/:memberId", updateMember);
router.delete("/deletemember/:memberId", deleteMember);
router.get("/getallDriver",getAllDriver)
router.get("/getdrivercount",getDriverCount)


// Agency Bus
router.post("/registerbus", validateDriver, registerBus);
// router.post("/registerroute", vaildBus, createRouteWithSchedule);
router.get("/bus-count", getBusCount);
router.get("/getAllBuses", getAllBuses);



// Combined GET method for all agency data
// router.get("/getagencydata/:agencyId", async (req, res) => {
//   const { agencyId } = req.params;

//   try {
//     // Get all members
//     const members = await getAllMembers({ params: { agencyId } });

//     // Combine the data
//     const result = {
//       members,
//     };

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving data", error });
//   }
// });

//payment

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

export default router;
