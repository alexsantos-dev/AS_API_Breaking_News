import { Router } from "express";
import cors from "cors"; // Importe o pacote cors
import { Login } from "../controllers/auth.controller.js";

const router = Router();

// Use o middleware cors apenas para esta rota
router.post("/", cors({ origin: "http://localhost:5173" }), Login);

export default router;
