import { Router } from "express";
import cors from "cors"; // Importe o pacote cors
import userController from "../controllers/user.controller.js";
import { validID, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

// Use o middleware cors apenas para esta rota
router.post("/", cors({ origin: "http://localhost:5173" }), userController.createService);
router.get("/", cors({ origin: "http://localhost:5173" }), userController.findAll);
router.get("/:id", cors({ origin: "http://localhost:5173" }), validID, validUser, userController.findById);
router.patch("/:id", cors({ origin: "http://localhost:5173" }), validID, validUser, userController.update);

export default router;
