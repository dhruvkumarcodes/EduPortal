import express from "express";
import { Router } from "express";
import { createCourse } from "../controllers/controller.js";

const router = Router();

router.post("/create", createCourse)

export default router;