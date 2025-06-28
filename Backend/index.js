import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from "./routes/routes.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

//middleware to read body
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//cloudinary code
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


const port = process.env.PORT || 3000;
const DB = process.env.MONGO_URI;

try {
    await mongoose.connect(DB);
    console.log("Connected to DataBase");
} catch (error) {
    console.log("Error while connecting to DataBase");
}

app.use("/api/v1/course", courseRoute);

app.listen(port, () => {
    console.log(`running on ${port}`);
});