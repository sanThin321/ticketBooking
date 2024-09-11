// controllers/authController.js
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/email.js';
import crypto from 'crypto';

//signup
export const signup = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, userType, password, confirmPassword } = req.body;

    // Validate the request
    if ( !firstName||!lastName||!email || !phoneNumber || !userType || !password || !confirmPassword ) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            userType,
            password
        });

        await user.save();
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

//user login
export const login= async (req, res)=>{
    const{email, password}=req.body;

    if (!email||!password){
        return res.status(400).json({message: 'Please enter all fields'});
    }


    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email'});
        }
        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:'Wrong password'});
        }
        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.userType
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Ensure you have this environment variable set
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                // Set the token in HttpOnly cookie
                res.cookie('token', token, {
                    httpOnly: true, // Secure cookie from XSS attacks
                    secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS in production
                    sameSite: 'strict', // Protect against CSRF
                    maxAge: 3600000 // Cookie expires in 1 hour
                });

                // Send response
                res.status(200).json({ role: user.userType, message: "Login successful" });
            }
        );
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Logout Controller
export const logout = (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

//
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
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
        await sendEmail(user.email, 'Password Reset Verification Code', null, message);

        res.status(200).json({ message: 'Password reset verification code sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending password reset token' });
    }
};
// Verify token
export const verifyCode = async (req, res) => {
    const { token } = req.body;

    try {
        // Hash the provided token
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Debug: Log the hashed token and current time
        console.log(`Hashed token: ${hashedToken}`);
        console.log(`Current time: ${Date.now()}`);

        // Find user with the hashed token and check if token is still valid
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }, // Token should still be valid
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.status(200).json({ message: 'Token is valid', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};


// Reset password function
// Reset password function
export const resetPassword = async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    try {
        // Hash the provided token
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with the hashed token and check if token is still valid
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }, // Token should still be valid
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Check if the new password and confirmation password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Set the new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined; // Clear reset token
        user.resetPasswordExpire = undefined; // Clear token expiration
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error resetting password' });
    }
};
