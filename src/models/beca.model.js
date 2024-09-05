import mongoose from "mongoose";

const becaSchema = new mongoose.Schema({
    beca: {
        type: String,
        required: true,
    },
    estadodebeca: {
        type: Boolean,
        default: false
    },
    maxUsos: {
        type: Number,
        default: 10
    },
    usosActuales: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Beca", becaSchema);