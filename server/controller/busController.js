import { RegisterBus } from "../model/agencyModel.js";

export const registerBus = async (req, res) => {
  const { agencyId, busNumber, driverId, totalSeat, imageOfTheBus } =
    req.body;
  const driver = await RegisterBus.findOne({ busNumber });
  if (driver) {
    return res.status(400).json({ message: "Driver is already asigned" });
  }
  try {
    const newBus = new RegisterBus({
      agencyId,
      driverId,
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

//update bus info
export const updateBus=async(req,res)=>{
  try{
    const{busId}=req.params;
    const{driverId, busNumber, totalSeat, imageOfTheBus}=req.body;

    const bus=await RegisterBus.findById(busId);
    if(!bus){
      return res.status(404).json({message:"Bus not found"});
    }

    //update bus detail
    if(driverId) bus.driverId=driverId;
    if(busNumber) bus.busNumber=busNumber;
    if(totalSeat) bus.totalSeat=totalSeat;
    if(imageOfTheBus) bus.imageOfTheBus=imageOfTheBus;

    await bus.save();
    res.status(200).json({message:"Bus updated successfully"})
  }catch(error){
    console.error('Error uypdating Bus:', error);
    res.status(500).json({message: 'Error in updating bus', error});
  }
};

//Delete a bus
export const deleteBus=async(req,res)=>{
  try{
    const {busId}=req.params;
    const bus=await RegisterBus.findById(busId);
    if(!bus){
      return res.status(404).json({message:"Bus not found"});
    }
    await RegisterBus.findByIdAndDelete(busId);
    res.status(200).json({message:"Bus deleted successfully"})
  } catch(error){
    console.error('Error deleting bud', error);
    res.status(500).json({message: "Error deleting bus", error})
  }
}

//get all the bus
export const getAllBus = async (req, res) => {
  try {
    const { agencyId } = req.params;
    const buses = await RegisterBus.find({ agencyId })
      .populate("driverId", "fullName -_id") // Populate only fullName, exclude _id in driverId
      .select("-password"); // Optionally exclude sensitive fields if any

    res.status(200).json({ buses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await RegisterBus.find(); // Retrieves all buses without filtering by agencyId
    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Error fetching buses", error });
  }
};

// Get total bus count
export const getBusCount = async (req, res) => {
  try {
    const busCount = await RegisterBus.countDocuments(); // Counts all buses without filtering by agencyId
    res.status(200).json({ busCount });
  } catch (error) {
    console.error("Error counting buses:", error);
    res.status(500).json({ message: "Error counting buses", error });
  }
};

