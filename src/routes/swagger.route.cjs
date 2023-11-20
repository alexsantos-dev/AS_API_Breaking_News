const express = require("express");
const cors = require("cors"); // Importe o pacote cors
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const router = express.Router();

// Use o middleware cors apenas para esta rota
router.get("/", cors({ origin: "http://localhost:5173" }), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
