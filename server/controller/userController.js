// controllers/authController.js
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



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
