import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "cookie"
        }
        mongoose.set("strictQuery", false);
        await mongoose.connect(DATABASE_URL, DB_OPTIONS, {
            useNewUrlParser: true,
        })
        mongoose.set('strictQuery', true);
        console.log("MongoDB is connected Successfully");
    } catch (err) {
        console.log(err.message)
    }
}

export default connectDB