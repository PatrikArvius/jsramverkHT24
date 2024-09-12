import mongoose from "mongoose";
const dsn = process.env.MONGOURI;

async function openDb() {
    try {
        await mongoose.connect(dsn)
        console.log("Connected")
    } catch (error) {
        console.error(error)
    }
}

export default openDb;
