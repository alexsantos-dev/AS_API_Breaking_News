import {Router} from "express"
const router = Router();

import {create, findAll, findById, searchByTitle, topNews, byUser, update, erase, likeNews, addComment} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create)
router.get("/", findAll)
router.get("/top", topNews)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddleware, byUser)
router.patch("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, erase)
router.patch("/like/:id", authMiddleware, likeNews)
router.patch("comments/:id", authMiddleware, addComment)

router.get("/:id", authMiddleware, findById)

export default router