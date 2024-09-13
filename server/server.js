import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";

dotenv.config({path:'./config.env'})
const app=express()
app.use(bodyParser.json());
app.use(cookieParser());
const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD,
)
// Updated connection options
const mongooseOptions = {
    
    ssl: true,  // Enable SSL
};
mongoose.connect(DB,mongooseOptions).then((con) => {
    console.log(con.connections)
    console.log('DB connection succesful')

}).catch(error => console.log(error))

app.use('/pelrizhabtho', authRoutes)
const port = 4004
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
})