import {Router} from "express"
const router = Router();

import {Login} from "../controllers/auth.controller.js"

router.post("/", Login)

export default router