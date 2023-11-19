import express from "express";
import cors from "cors";
const router = express.Router();

import {
    create,
    findAll,
    findById,
    searchByTitle,
    topNews,
    byUser,
    update,
    erase,
    likeNews,
    addComment,
    deleteComment,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Configurar o middleware CORS para permitir apenas origens específicas
const corsOptions = {
    origin: 'http://localhost:5173', // Substitua pelo seu domínio permitido
    methods: 'GET,HEAD,PATCH,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

router.use(cors(corsOptions));

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, likeNews);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment);

router.get("/:id", authMiddleware, findById);

export default router;
