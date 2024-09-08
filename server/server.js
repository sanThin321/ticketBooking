import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from './routes/userRoutes.js';
import createDefaultAdmin from './adminSetup.js';
import cookieParser from "cookie-parser";

dotenv.config({path:'./config.env'})
const app=express()
app.use(bodyParser.json());
app.use(cookieParser());
const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD,
)

// Function to connect to MongoDB with retry logic
const connectWithRetry = () => {
    console.log('Attempting to connect to MongoDB...');
    
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('MongoDB connection successful');
        createDefaultAdmin(); // Create default admin after successful connection
    })
    .catch((error) => {
        console.error('MongoDB connection failed, retrying in 5 seconds...', error);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

// Start retrying connection
connectWithRetry();

//cosole.log(process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then((con) => {
    console.log(con.connections)
    console.log('DB connection succesful')
    createDefaultAdmin();

}).catch(error => console.log(error))

app.use('/pelrizhabtho', authRoutes)
const port = 4004
app.listen(port, () => {
    console.log(`App running on port ${port}..`)
})