import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";  // Import CORS
import authRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import agencyRoutes from "./routes/agencyRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config({ path: './config.env' });
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

app.use(bodyParser.json());
app.use(cookieParser());

const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD,
);

// Updated connection options
const mongooseOptions = {
    ssl: true,  // Enable SSL
};
mongoose.connect(DB, mongooseOptions).then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
}).catch(error => console.log(error));

app.use('/pelrizhabtho', authRoutes)
app.use('/pelrizhabtho/agency', agencyRoutes)
app.use('/pelrizhabtho/admin', adminRoutes)

const port = 4004;
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});
