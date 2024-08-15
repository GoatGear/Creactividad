import mongoose from 'mongoose'
import { MONGO_API_K } from '../src/config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_API_K);
        console.log("Ready")
    } catch (error) {
        console.log(error);
    }
}
