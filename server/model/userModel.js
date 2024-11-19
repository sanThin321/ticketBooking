import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { type } from "os";


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    userType:{
        type:String,
        enum: ['Admin', 'Agency', 'Customer'],
        default: 'Customer' 
    },
    agencyName: {
        type: String,
        required: function() { return this.userType === 'Agency'; }, 
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    agencyLogo:{
        type:String,
        required: function() { return this.userType === 'Agency'; },
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function() {
    
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); 


    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken; 
};
const User = mongoose.model('User', userSchema, 'User');
export default User;