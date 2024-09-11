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
    },
    Departure:{
        type:String,
        required:true
    },
    Arrival:{
        type: String,
        required:true
    }
})

//Register member
const registerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['Driver', 'Ticket Agent'],
        default:'Ticket Agent'
    }
})

//register bus
const registerBusSchema=new mongoose.Schema({
    driverName:{
        type:String,
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
    }
})
const Routes=mongoose.model('Routes', routeSchema, 'Routes')
const Register=mongoose.model('Register', registerSchema, 'Register')
const RegisterBus=mongoose.model('RegisterBus', registerBusSchema, 'RegisterBus')

export default Routes;
export {Register, RegisterBus}