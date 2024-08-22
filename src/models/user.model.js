import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre : {
        type: String,
        require: true,
        trim: true
    },
    apellido : {
        type: String,
        require: true,
        trim: true
    },
    profesion : {
        type: String,
        require: true,
        trim: true
    },
    especialidad : {
        type: String,
        require: true,
        trim: true
    },
    correo : {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },  
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    qrcodeImage: { type : String }
},{
    timestamps: true
})

export default mongoose.model('User', userSchema)