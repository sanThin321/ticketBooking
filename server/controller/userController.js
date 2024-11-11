import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail, sendFeedback } from "../utils/email.js";
import crypto from "crypto";
import { RegisterMember } from "../model/agencyModel.js";
//signup
export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    userType,
    password,
    confirmPassword,
    agencyName,
  } = req.body;

  // Validate the request
  if (
    !firstName ||
    !email ||
    !phoneNumber ||
    !userType ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if (userType === "Agency") {
      if (!agencyName || agencyName.trim() === "") {
        return res
          .status(400)
          .json({ msg: "Agency name is required for Agency user type" });
      }

      const existingAgency = await User.findOne({ agencyName });
      if (existingAgency) {
        return res.status(400).json({ msg: "Agency already exists" });
      }
    }
    // Create and save the user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      // Only include agencyName if userType is 'Agency'
      agencyName: userType === "Agency" ? agencyName : undefined,
      password,
    });

    await newUser.save();
    // Automatically log the user in by generating JWT
    const payload = {
      user: {
        id: newUser.id,
        role: newUser.userType,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        // Set the token in an HttpOnly cookie
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production", // Secure in production
        //   sameSite: "strict",
        //   maxAge: 3600000, // 1 hour
        // });

        res.status(200).json({
          token,
          role: newUser.userType,
          message: "Signup successful and logged in",
        });
      }
    );
    // res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    const member = await RegisterMember.findOne({ email }).populate("agencyId");
    if (!user && !member) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.userType,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;

          // // Set the token in HttpOnly cookie
          // res.cookie("token", token, {
          //   httpOnly: true,
          //   // secure: process.env.NODE_ENV === "production", // Secure in production
          //   secure: false,
          //   sameSite: "lax",
          //   maxAge: 3600000, // 1 hour
          // });

          res
            .status(200)
            .json({
              role: user.userType,
              token: token,
              id: user._id,
              message: "Login successful as User",
            });
        }
      );
    } else {
      // member= await RegisterMember.findOne({email}).populate('agencyId')
      const Ismatch = await bcrypt.compare(password, member.password);
      if (!Ismatch) {
        return res.status(400).json({ message: "Wrong password" });
      }
      const payload = {
        member: {
          id: member.id,
          agencyId: member.agencyId,
          role: member.role,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;

          // // Set the token in HttpOnly cookie
          // res.cookie("token", token, {
          //   httpOnly: false,
          //   secure: process.env.NODE_ENV === "production", // Secure in production
          //   sameSite: "strict",
          //   maxAge: 3600000, // 1 hour
          // });

          res.status(200).json({
            token: token,
            role: "registerMember",
            message: "Login successful as Register Member",
          });
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.status(200).send({ message: "Logged out successfully" });
};

// Check if the user is logged in
export const checkLogin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ loggedIn: false, message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decoded.user?.id || decoded.member?.id);
    if (!user) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "User not found" });
    }

    // If the token is valid and user exists, return login status and role
    return res.status(200).json({
      loggedIn: true,
      role: decoded.user?.role || decoded.member?.role,
    });
  } catch (error) {
    return res.status(401).json({ loggedIn: false, message: "Invalid token" });
  }
};

//
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Generate a 6-digit numeric reset token
    const resetToken = user.generatePasswordResetToken();

    // Save the user with the reset token and expiration in the database
    await user.save();

    // Prepare the HTML message with the centered token (code) for email
    const message = `
            <p>Your password reset verification code is:</p>
            <h2 style="text-align: center; user-select: all;">${resetToken}</h2> <!-- Centered and selectable code -->
            <p>Please enter this code on the verification page.</p>
            <p style="color: red; font-size: 12px;">Note: This is an automated email, and responses will not be monitored.</p>
        `;

    // Send email with the numeric token/code in HTML format
    await sendEmail(
      user.email,
      "Password Reset Verification Code",
      null,
      message
    );

    res
      .status(200)
      .json({ message: "Password reset verification code sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending password reset token" });
  }
};

// Verify token
export const verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    // Hash the provided token
    const hashedToken = crypto.createHash("sha256").update(code).digest("hex");

    // Find user with the hashed token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Token should still be valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    res.status(200).json({
      message: "Token is valid",
      redirectUrl: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


// Reset password using the temporary token
export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { userId } = req.params;

  try {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password
    user.password = newPassword
    user.resetPasswordToken = undefined; // Clear reset token
    user.resetPasswordExpire = undefined; // Clear token expiration
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const feedback = async (req, res) => {
  try {
    const { email, feedbackText } = req.body;
    if (!email || !feedbackText) {
      return res.status(400).send("Email and feedback text are required");
    }
    await sendFeedback(email, feedbackText);
    res.status(200).send("Feedback sent successfully");
  } catch (error) {
    return res.status(500).send('Failed to send feedback', error)
  }
};

