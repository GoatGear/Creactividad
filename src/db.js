import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('monguit');
        console.log("Ready")
    } catch (error) {
        console.log(error);
    }
}
