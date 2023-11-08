import mongoose from "mongoose";

const connectDatabase = () => {
    console.log("Esperando conexão ao banco de dados...")

    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas conectado!"))
    .catch((error) => console.log(error))
}

export default connectDatabase