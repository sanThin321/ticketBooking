import {Routes,RegisterMember, RegisterBus} from '../model/agencyModel.js';
import Agency from '../model/agencyModel.js';


// Add a new route
export const addRoute = async (req, res) => {
  const { agencyId, From, To, Departure, Arrival } = req.body;

  // Validate required fields
  if (!agencyId || !From || !To || !Departure || !Arrival) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
      // Check if the agency exists
      const agency = await Agency.findById(agencyId);
      if (!agency) {
          return res.status(404).json({ msg: 'Agency not found' });
      }

      // Create a new route
      const newRoute = new Routes({
          agencyId,
          From,
          To,
          Departure,
          Arrival
      });

      // Save the route to the database
      await newRoute.save();

      res.status(201).json({ msg: 'Route added successfully', route: newRoute });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
  }
};
  
// Get all routes
export const getAllRoutes = async (req, res) => {
    try {
      const routes = await Routes.find();
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching routes', error });
    }
};
// Update a route
export const updateRoute = async (req, res) => {
    const { id } = req.params;
    const { From, To, Departure, Arrival } = req.body;
  
    try {
      const route = await Routes.findById(id);
  
      if (!route) {
        return res.status(404).json({ message: 'Route not found' });
      }
  
      // Update the route fields
      route.From = From || route.From;
      route.To = To || route.To;
      route.Departure = Departure || route.Departure;
      route.Arrival = Arrival || route.Arrival;
  
      // Save the updated route
      const updatedRoute = await route.save();
  
      res.status(200).json({
        message: 'Route updated successfully',
        route: updatedRoute
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating route', error });
    }
};
  
// Delete a route
export const deleteRoute = async (req, res) => {
    const { id } = req.params;
  
    try {
        const route = await Routes.findByIdAndDelete(id);
  
      if (!route) {
        return res.status(404).json({ message: 'Route not found' });
      }

      res.status(200).json({
        message: 'Route deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting route', error });
    }
};

//Register member
export const register= async (req, res)=>{
    try{
        const{fullName, email, phoneNumber, role}= req.body;
        // Validate the request
        if ( !fullName||!email || !phoneNumber || !role ) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        let member = await RegisterMember.findOne({ email });
        if (member) {
            return res.status(400).json({ msg: 'Member already exists' });
        }
        //registerMe a member
        const registration= new RegisterMember({
            fullName,
            email,
            phoneNumber,
            role
        });

        //save the member to the database
        await registration.save()
        res.status(200).json({
            message: 'Successfully register the member',
            Member: registration
        });
    }catch(error){
        res.status(500).json({message:'Error in registration', error});
    }
};

//Get the all member
export const getAllMember=async(req,res)=>{
    try{
        const members=await RegisterMember.find();
        res.status(200).json(members);
    }catch(error){
        res.status(500).json({message: 'Error fetching members'})
    }
}

//update the member
export const updateMember=async (req, res)=>{
    const { id }= req.params;
    const { fullName, email, phoneNumber, role } = req.body;

    try{
        const member= await RegisterMember.findById(id);

        if(!member){
            return res.status(404).json({message: 'Member not found'})
        }

        //update the member
        member.fullName= fullName || member.fullName;
        member.email= email || member.email;
        member.phoneNumber=phoneNumber || member.phoneNumber;
        member.role=role || member.role;

        //save the member fields
        const updateMember=await member.save();

        res.status(200).json({
            message: 'Member updated successfully',
            member: updateMember
        });
    }catch(error){
        res.status(500).json({message:'Error updating the member', error})
    }
};

//Delete member
export const deleteMember=async(req, res)=>{
    const { id }=req.params;

    try{
        const member=await RegisterMember.findByIdAndDelete(id);

        if(!member){
            return res.status(404).json({message:'Member not found'})
        }

        res.status(200).json({
            message: 'Member deleted successfully'
        });
    }catch(error){
        res.status(500).json({message:'Error deleting member', error })
    }
};

//register Bus
export const registerbus= async (req, res)=>{
  try{
    const{driverName, busNumber, totalSeat, imageOfTheBus}=req.body;

    let bus=await RegisterBus.findOne({busNumber});
    if (bus){
      return res.status(400).json({message:'Bus Number already exits in other bus'})
    }
    // register the bus
    const registrationForBus=new RegisterBus({
      driverName,
      busNumber,
      totalSeat,
      imageOfTheBus
    });

    //save the bus
    await registrationForBus.save();
    res.status(200).json({
      message:'Successfully register the bus'
    });
  }catch(error){
    res.status(500).json({message:'Error in registration',error})
  }
};

//get all the registerBus
export const getAllBus=async(req,res)=>{
  try{
      const buses=await RegisterBus.find();
      res.status(200).json(buses);
  }catch(error){
      res.status(500).json({message: 'Error fetching buses'})
  }
}

//update the bus
export const updateBus=async (req, res)=>{
  const { id }= req.params;
  const { driverName, busNumber, totalSeat, imageOfTheBus } = req.body;

  try{
      const bus= await RegisterBus.findById(id);

      if(!bus){
          return res.status(404).json({message: 'Bus not found'})
      }

      //update the member
      bus.driverName= driverName || bus.driverName;
      bus.busNumber= busNumber || bus.busNumber;
      bus.totalSeat=totalSeat || bus.totalSeat;
      bus.imageOfTheBus=imageOfTheBus || bus.imageOfTheBus;

      //save the member fields
      await bus.save();

      res.status(200).json({
          message: 'Bus updated successfully',
      });
  }catch(error){
      res.status(500).json({message:'Error updating the bus', error})
  }
};

//Delete bus
export const deleteBus=async(req, res)=>{
  const { id }=req.params;

  try{
      const bus=await RegisterBus.findByIdAndDelete(id);

      if(!bus){
          return res.status(404).json({message:'Bus not found'})
      }

      res.status(200).json({
          message: 'Bus deleted successfully'
      });
  }catch(error){
      res.status(500).json({message:'Error deleting bus', error })
  }
};