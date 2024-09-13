import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto';


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    userType:{
        type:String,
        enum: ['Admin', 'Agency', 'Customer'],
        default: 'Customer' 
    },
    agencyName: {
        type: String,
        required: function() { return this.userType === 'Agency'; }, // Required if userType is 'Agency'
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// Method to generate and hash the reset token
userSchema.methods.generatePasswordResetToken = function() {
    // Generate a 6-digit random number
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Ensures it's a 6-digit number

    // Hash the reset token and set it to the resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set token expiration time (30 minutes)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    console.log(`Generated reset token: ${resetToken}`);
    return resetToken; // Return the plain token (6-digit number) to be sent in email
};
const User = mongoose.model('User', userSchema, 'User');
export default User;