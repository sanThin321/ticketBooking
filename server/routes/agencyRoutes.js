import express from "express";
import {
  addTicket,
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
} from "../controller/memberController.js";
import { registerBus } from "../controller/busController.js";
import { createRouteWithSchedule } from "../controller/routeandschedule.js";
import { processPayment } from "../controller/paymentController.js";
const router = express.Router();

// Agency member
router.post("/registermember", registerMember);
router.put("/updatemember/:memberId", updateMember);
router.delete("/deletemember/:memberId", deleteMember);
router.get("/allmembers/:agencyId", getAllMembers);

// Agency Bus
router.post("/registerbus", registerBus);
router.post("/registerroute", vaildBus, createRouteWithSchedule);

// Combined GET method for all agency data
router.get("/getagencydata/:agencyId", async (req, res) => {
  const { agencyId } = req.params;

  try {
    // Get all schedules
    const schedules = await getAllSchedules(agencyId);

    // Get all members
    const members = await getAllMembers({ params: { agencyId } });

    // Combine the data
    const result = {
      schedules,
      members,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
});

//payment

router.post("/verify-payment", processPayment);

//ticket
router.post("/addTicket", validateBus, addTicket);
router.get("/getallticket", getallTicket);
router.get("/getticket/:ticket_id", getTicket);
router.put("/tickets/:ticket_id/book", updateBookedTicket);
router.delete("/deleteTicket/:ticketId", delateTicket);
router.put("/updateTicket/:ticketId", validateBus, updateTicket);

export default router;
