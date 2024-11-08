import mongoose from "mongoose";

// Register member schema
const registerSchema = new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
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
    role: {
        type: String,
        enum: ['Driver', 'Ticket Agent'],
        default: 'Ticket Agent'
    },
    password: {
        type: String,
        required: function () {
            return this.role === 'Ticket Agent';
        }
    }
});

// Register bus schema
const registerBusSchema = new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register_member',  // Ensure this matches the model name exactly
        required: true
    },
    busNumber: {
        type: String,
        required: false,
        unique: true
    },
    totalSeat: {
        type: String,
        required: false
    },
    imageOfTheBus: {
        type: String,
        required: false
    }
});

// Register models
const RegisterMember = mongoose.model('Register_member', registerSchema);
const RegisterBus = mongoose.model('Register_Bus', registerBusSchema);

export { RegisterMember, RegisterBus };
