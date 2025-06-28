import express from "express";
import { Router } from "express";
import { createCourse, deleteCourse, updateCourse } from "../controllers/controller.js";

const router = Router();

router.post("/create", createCourse)
router.put("/update/:courseId", updateCourse)
router.delete("/delete/:courseId", deleteCourse)
export default router;