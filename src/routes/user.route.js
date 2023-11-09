import {Router} from "express"
import userControler from "../controllers/user.controller.js";
import { validID, validUser } from "../middlewares/global.middlewares.js";

const router = Router();


router.post("/", userControler.createService)
router.get("/", userControler.findAll)
router.get("/:id", validID, validUser, userControler.findById)
router.patch("/:id", validID, validUser, userControler.update)

export default router