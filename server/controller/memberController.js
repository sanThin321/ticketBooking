import { RegisterMember } from "../model/agencyModel.js";
import bcrypt from "bcrypt";

export const registerMember = async (req, res) => {
  try {
    // const agencyId=req.user.id;
    // const userRole=req.user.role;

    // if(userRole!='Agency'){
    //     return res.status(400).json({message:"The user is not an Agency"})
    // }
    const { agencyId, fullName, email, phoneNumber, role, password } = req.body;

    let member = await RegisterMember.findOne({ email });
    if (member) {
      return res.status(400).json({ message: "Member is already register" });
    }

    const newMemberData = new RegisterMember({
      agencyId,
      fullName,
      email,
      phoneNumber,
      role,
    });

    if (role === "Ticket Agent") {
      if (!password) {
        return res.status(400).json({ message: "Require password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      newMemberData.password = hashedPassword;
    }

    const newMember = new RegisterMember(newMemberData);
    await newMember.save();

    const populatedMember = await RegisterMember.findById(
      newMember._id
    ).populate("agencyId", "agencyName");

    res
      .status(201)
      .json({
        message: "Member registered successfully",
        member: populatedMember,
      });
  } catch (error) {
    console.error("Error registering member:", error);
    res.status(500).json({ message: "Error registering member", error });
  }
};

//update
export const updateMember = async (req, res) => {
  try {
    const { memberId } = req.params; // Assuming memberId is passed as a URL param
    const { fullName, email, phoneNumber, role, password } = req.body;

    let member = await RegisterMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Update member details
    if (fullName) member.fullName = fullName;
    if (email) member.email = email;
    if (phoneNumber) member.phoneNumber = phoneNumber;
    if (role) member.role = role;

    // If the role is Ticket Agent and a password is provided, update the password
    if (role === "Ticket Agent" && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      member.password = hashedPassword;
    }

    await member.save();

    const updatedMember = await RegisterMember.findById(member._id).populate(
      "agencyId",
      "agencyName"
    );

    res
      .status(200)
      .json({ message: "Member updated successfully", member: updatedMember });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "Error updating member", error });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params; // Assuming memberId is passed as a URL param

    let member = await RegisterMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await RegisterMember.findByIdAndDelete(memberId);

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Error deleting member", error });
  }
};

//get all the member
export const getAllMembers = async (req, res) => {
  try {
    const { agencyId } = req.params; // Get agencyId from the URL parameter

    const members = await RegisterMember.find({ agencyId })
      .populate("agencyId", "agencyName") // Populate agencyName from agencyId reference
      .select("-password"); // Exclude password for security

    if (members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for this agency" });
    }

    res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching members by agency ID:", error);
    res.status(500).json({ message: "Error fetching members", error });
  }
};
const getAllDriver = async (req, res) => {
  try {
    const driver = await RegisterMember.find();
    if (!driver) {////(!driver && driver.agencyId!=req.userId)
      return res.status(404).json({ message: "Driver not found" });
    }
    if(driver.role=='Ticket Agent'){
      return res.status(400).json({ message: "This is Ticket Agent" });
    }
    return res.status(200).json(driver);
  } catch (error) {
  }
};
export { getAllDriver };
