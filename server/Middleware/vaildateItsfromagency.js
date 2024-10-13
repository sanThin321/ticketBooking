import { RegisterBus, RegisterMember } from "../model/agencyModel.js";

export const validateDriver = async (req, res, next) => {
  const { agencyId, driverName } = req.body;
  
  try {
    const driver = await RegisterMember.findOne({
      fullName: driverName,
      role: "Driver",
    });

    if (!driver) {
      return res
        .status(400)
        .json({ error: "Driver not found or not a Driver" });
    }
    if (agencyId != driver.agencyId) {
      return res(400).json({ message: "Driver is not from this agency" });
    }
    req.driverId = driver._id; // Attach the driver ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const vaildBus = async (req, res, next) => {
  const { BusNumber } = req.body;
  try {
    const bus = await RegisterBus.findOne({
      busNumber: BusNumber,
    });
    
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    req.busId = bus._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
