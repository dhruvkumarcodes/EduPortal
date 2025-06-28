import express from "express";
import { Router } from "express";
import { courseDetails, createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/controller.js";

const router = Router();

router.post("/create", createCourse)
router.put("/update/:courseId", updateCourse)
router.delete("/delete/:courseId", deleteCourse)
router.get("/courses", getCourses)
router.get("/:courseId", courseDetails)


export default router;