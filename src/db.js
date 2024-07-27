import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://edgardoierr:R9r8Heojd0cwmO6V@mongodb1.ni1xbm8.mongodb.net/');
        console.log("Ready")
    } catch (error) {
        console.log(error);
    }
}
