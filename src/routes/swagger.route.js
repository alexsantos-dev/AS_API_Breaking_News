import {Router, json} from "express"
const router = Router()

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../services/swagger.json"

router.use("/", swaggerUi.serve)
router.get("/", swaggerUi.setup(swaggerDocument))


export default router