import express from "express"
import connectDatabase from "./database/db.js"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import newsRoute from "./routes/news.route.js"
import dotenv from "dotenv"
import swaggerRoute from "./routes/swagger.route.cjs"

dotenv.config()

const app = express();
const porta = process.env.PORT || 3000 

connectDatabase()
app.use(express.json())
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
app.use("/doc", swaggerRoute)

app.listen(porta, () => console.log(`Servidor rodando na porta: ${porta}`))