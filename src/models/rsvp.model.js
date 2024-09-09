import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'SOMEEC - Curso Internacional de Arritmias y Marcapasos.'
    },
    description: {
        type: String,
        default: ' 23, 24 y 25 de Septiembre - Show Center Airó, N.L.'
    },
    reservacion: {
        type: String,
        require: true
    },
    beca: {
        type: String,
        require: false
    },
    a1: {
        type: Boolean,
        require: false,
        default: false
    },
    a2: {
        type: Boolean,
        require: false,
        default: false
    },
    a3: {
        type: Boolean,
        require: false,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Rsvp", rsvpSchema);