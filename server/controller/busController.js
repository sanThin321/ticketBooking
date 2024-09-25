import { RegisterBus } from "../model/agencyModel.js";

export const registerBus = async (req, res) => {
  const { agencyId, driverName, busNumber, totalSeat, imageOfTheBus } =
    req.body;
  const driver = await RegisterBus.findOne({ driverName });
  if (driver) {
    return res.status(400).json({ message: "Driver is already asigned" });
  }
  try {
    const newBus = new RegisterBus({
      agencyId,
      driverId: req.driverId,
      driverName,
      busNumber,
      totalSeat,
      imageOfTheBus,
    });

    await newBus.save();
    res.status(200).json({ message: "Bus registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
