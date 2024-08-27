import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'SOMEEC - Curso Internacional de arritmias y marcapasos.'
    },
    description: {
        type: String,
        default: ' 23, 24 y 25 de Septiembre - Show Center Airó, N.L.'
    },
    reservacion: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Rsvp", rsvpSchema);