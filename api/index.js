import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookierParser from 'cookie-parser'

dotenv.config()

const app = express()
console.log(process.env.MONGODB_URI);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to db ')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB disconected")
})

mongoose.connection.on("connected", () => {
    console.log("Mongo DB conected")
})

//middlewares
// accept json requests
app.use(cookierParser());
app.use(express.json());
// routes middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
})

app.listen(8800, () => {
    connect();
    console.log('Connected to backend');
})