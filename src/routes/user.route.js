const route = require("express").Router();

const userControler = require("../controllers/user.controller");
const { validID, validUser } = require("../middlewares/global.middlewares");

route.post("/", userControler.createService)
route.get("/", userControler.findAll)
route.get("/:id", validID, validUser, userControler.findById)
route.patch("/:id", validID, validUser, userControler.update)

module.exports = route