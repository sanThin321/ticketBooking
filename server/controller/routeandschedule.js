import Routes, { RegisterBus, Schedule } from "../model/agencyModel.js";
import Ticket from "../model/Ticket.js";

export const createRouteWithSchedule = async (req, res) => {
  try {
    const { agencyId, from, to, busNumber, departureTime, arrivalTime, date } = req.body;
    const route = await Routes.findOne({ from, to });
    const newRoute = new Routes({
      from,
      to,
    });
    const newRouteDetail = new Routes(newRoute);
    await newRouteDetail.save();
    const newSchedule = new Schedule({
      agencyId,
      routeId: newRouteDetail.id,
      busId: req.busId,
      busNumber,
      departureTime,
      arrivalTime,
      date,
    });
    const scheduleDetails = new Schedule(newSchedule);
    await scheduleDetails.save();
    const busId = await RegisterBus.findById(req.busId);
    const newTicket = new Ticket({
      schedule: scheduleDetails._id,
      availableSeat:busId.totalSeat,
      booked: [],  // Initialize with an empty booked array
    });
    await newTicket.save();
    res
      .status(200)
      .json({ message: "Successfully created the Route and Schedule" });
  } catch (error) {
    console.error("Error while creating the route and schedule:", error);
    res
      .status(500)
      .json({ message: "Error while creating the route and schedule:", error });
  }
};

export const updateScheduleWithRoute = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { from, to, busNumber, departureTime, arrivalTime,date } = req.body;

    const schedule = await Schedule.findById(scheduleId).populate("routeId");
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (from || to) {
      const route = Schedule.routeId;
      if (from) route.From = from;
      if (to) route.To = to;
      await route.save();
    }

    if (busNumber) {
      schedule.busNumber = busNumber;
      schedule.busId = req.busId;
    }
    if (departureTime) schedule.departureTime = departureTime;
    if (arrivalTime) schedule.arrivalTime = arrivalTime;
    if (date) schedule.date = date;

    await schedule.save();

    res
      .status(200)
      .json({ message: "Schedule and route updated successfully" });
  } catch (error) {
    console.error("Error updating schedule and route:", error);
    res
      .status(500)
      .json({ message: "Error updating schedule and route", error });
  }
};

export const deleteScheduleWithRoute = async (req, res) => {
  try {
    
    const { scheduleId } = req.params;
    const schedule = await Schedule.findById(scheduleId).populate("routeId");
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Get the associated route from the schedule
    const route = schedule.routeId;

    // Delete the schedule first
    await Schedule.findByIdAndDelete(scheduleId);

    // If there's a route associated, delete the route as well
    if (route) {
      await Routes.findByIdAndDelete(route._id);
    }
    res
      .status(200)
      .json({ message: "Schedule and associated route deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule and route:", error);
    res
      .status(500)
      .json({ message: "Error deleting schedule and route", error });
  }
};

//get all the schedule

export const getAllSchedules = async (agencyId) => {
  try {
    const schedules = await Schedule.find({ agencyId })
      .populate('routeId')
      .populate("agencyId", "agencyName")
      .populate('busId');
    return schedules;
  } catch (error) {
    throw new Error("Error retrieving schedules: " + error.message);
  }
};
