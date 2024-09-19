// import mongoose from "mongoose";

// //route
// const routeSchema= new mongoose.Schema({
//     agencyId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Agency',
//         required: true
//     },
//     From:{
//         type:String,
//         required:true
//     },
//     To:{
//         type:String,
//         required:true
//     },
//     Departure:{
//         type:String,
//         required:true
//     },
//     Arrival:{
//         type: String,
//         required:true
//     }
// })

// //Register member
// const registerSchema=new mongoose.Schema({
//     agencyId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Agency',
//         required: true
//     },
//     fullName:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     phoneNumber:{
//         type:Number,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['Driver', 'Ticket Agent'],
//         default:'Ticket Agent'
//     }
// })

// //register bus
// const registerBusSchema=new mongoose.Schema({
//     agencyId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Agency',
//         required: true
//     },
//     driverName:{
//         type:String,
//         required:true
//     },
//     busNumber:{
//         type:String,
//         required: true,
//         unique: true
//     },
//     totalSeat:{
//         type:Number,
//         required:true
//     },
//     imageOfTheBus:{
//         type:String,
//         required:true
//     }
// })
// const Agency = mongoose.model('Agency', agencySchema, 'Agency');
// const Routes=mongoose.model('Routes', routeSchema, 'Routes')
// const RegisterMember=mongoose.model('RegisterMember', registerSchema, 'RegisterMember')
// const RegisterBus=mongoose.model('RegisterBus', registerBusSchema, 'RegisterBus')
// export default Agency;
// export {Routes, RegisterMember, RegisterBus}
