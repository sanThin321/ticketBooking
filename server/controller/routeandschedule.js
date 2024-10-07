import Routes, { Schedule } from "../model/agencyModel";

export const createRouteWithSchedule = async (req, res) => {
  try {
    const { agencyId, From, To, BusNumber, Departure, Arrival } = req.body;
    const route = await Routes.findOne({ From, To });
    if (route) {
      return res.status(400).json({ message: "Route already exit" });
    }
    const newRoute = new Routes({
      From,
      To,
    });
    const newRouteDetail = new Routes(newRoute);
    await newRouteDetail.save();
    const newSchedule = new Schedule({
      agencyId,
      routeId: newRouteDetail.id,
      busId: req.busId,
      BusNumber,
      Departure,
      Arrival,
    });
    const scheduleDetails = new Schedule(newSchedule);
    await scheduleDetails.save();
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
    const { From, To, BusNumber, Departure, Arrival } = req.body;

    const schedule = await Schedule.findById(scheduleId).populate("routeId");
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (From || To) {
      const route = Schedule.routeId;
      if (From) route.From = From;
      if (To) route.To = To;
      await route.save();
    }

    if (BusNumber) {
      schedule.BusNumber = BusNumber;
      schedule.busId = req.busId;
    }
    if (Departure) schedule.Departure = Departure;
    if (Arrival) schedule.Arrival = Arrival;

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
