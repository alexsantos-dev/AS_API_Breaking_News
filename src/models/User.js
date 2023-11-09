import mongoose from "mongoose"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    usename: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    avatar:{
        type: String,
        require: true,
    },
    bacckground: {
        type: String,
        require: true,
    }
})

userSchema.pre("save",  function (next) {
    this.password =  bcrypt.hashSync(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema)

export default User