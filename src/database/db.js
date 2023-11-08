import mongoose from "mongoose";

const connectDatabase = () => {
    console.log("Esperando conexão ao banco de dados")

    mongoose
    .connect("mongodb+srv://alex:Alphometa-7803@cluster0.oit3dmg.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Atlas conectado!"))
    .catch((error) => console.log(error))
}

export default connectDatabase