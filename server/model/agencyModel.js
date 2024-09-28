import mongoose from "mongoose";

//route
const routeSchema= new mongoose.Schema({
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    }
})

//Register member
const registerSchema = new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
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

//register bus
const registerBusSchema=new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegisterMember',
        required:true
    },
    busNumber:{
        type:String,
        required: true,
        unique: true
    },
    totalSeat:{
        type:Number,
        required:true
    },
    imageOfTheBus:{
        type:String,
        required:true
    },
    driverName:{
        type:String,
        required:true
    }
})

//shedule
const scheduleSchema=new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    routeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Routes",
        required: true
    },
    busId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Register_Bus",
        required: true
    },
    BusNumber:{
        type:String,
        required:true
    },
    Departure:{
        type:String,
        required:true
    },
    Arrival:{
        type:String,
        required:true
    }
})

const RegisterMember =mongoose.model('Register_member', registerSchema,'Register_member');
const RegisterBus=mongoose.model('Register_Bus', registerBusSchema, 'Register_Bus');
const Schedule=mongoose.model('Schedule',scheduleSchema, 'Schedule');
const Routes=mongoose.model('Routes', routeSchema, 'Routes');
export default Routes;
export {RegisterMember, RegisterBus, Schedule};

