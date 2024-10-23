import User from "../model/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    // const user = await User.findById(req.user.id).select(
    //   "-userType -agencyName"
    // ); // Exclude userType and agencyName
    const user = await User.findById(userId).select(
      "-userType -agencyName -password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Update First and Last Name
export const updateNames = async (req, res) => {
  try {
    const { userId } = req.params;
    // const user = await User.findById(req.user.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();
    res.status(200).json({ message: "Names updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Email
export const updateEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    // const user = await User.findById(req.user.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { email } = req.body;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Phone Number
export const updatePhone = async (req, res) => {
  try {
    const { userId } = req.params;
    // const user = await User.findById(req.user.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { phoneNumber } = req.body;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({ message: "Phone number updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    // const user = await User.findById(req.user.id);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check if new password and confirmation password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirmation password do not match",
      });
    }

    // Hash the new password and update it
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
