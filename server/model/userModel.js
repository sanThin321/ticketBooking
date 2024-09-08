import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    password: {
        type: String,
        required: true
    }
})
// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// const User = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema, 'User');
export default User;