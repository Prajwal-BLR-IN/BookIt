import express from "express";
import { validatePromo } from "../controllers/promo.controller.js";

const promoRouter = express.Router();

promoRouter.post("/validate", validatePromo);

export default promoRouter;
