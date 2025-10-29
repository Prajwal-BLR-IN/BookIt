import express from "express";
import { getAllExperiences, getExperienceById } from "../controllers/experience.controller.js";

const experienceRouter = express.Router();

experienceRouter.get("/", getAllExperiences);
experienceRouter.get("/:id", getExperienceById);

export default experienceRouter;
