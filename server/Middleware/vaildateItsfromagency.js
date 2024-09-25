import { RegisterMember } from "../model/agencyModel.js";

export const validateDriver = async (req, res, next) => {
  const { agencyId, driverName } = req.body;

  try {
    const driver = await RegisterMember.findOne({
      agencyId,
      fullName: driverName,
      role: 'Driver',
    });

    if (!driver) {
      return res.status(400).json({ error: 'Driver not found or not a Driver' });
    }

    req.driverId = driver._id; // Attach the driver ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error'   
 });
  }
};