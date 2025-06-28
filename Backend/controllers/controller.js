import { Course } from "../models/model.js";
import { v2 as cloudinary } from 'cloudinary';
export const createCourse = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    try {
        if (!title || !description || !price) {
            return res.status(400).json({ error: "all fields are required" })
        }

        const { image } = req.files

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const allowedFormat = ["image/png", "image/jpeg"]
        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({ errors: "invalid File Format" });
        }


        //cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)
        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ errors: "error uploading file" })
        }

        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.url
            }
        }
        const course = await Course.create(courseData);
        res.json({
            message: "course created successfully",
            course,
        })
    } catch (error) {
        console.log("error")
    }
}