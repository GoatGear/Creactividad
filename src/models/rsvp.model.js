import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'ANCISSSTE - 2da Reunión Regional'
    },
    description: {
        type: String,
        default: ' 7 al 9 de Noviembre - Hotel MS Milenium by Hilton, San Pedro Garza García, N.L.'
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