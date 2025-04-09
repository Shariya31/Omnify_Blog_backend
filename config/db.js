import mongoose from "mongoose";

const connectDB = async(url)=>{
    try {
        const connect = await mongoose.connect(url, {dbName: 'omnify_blog'});
        console.log(`db is connected to ${connect.connection.host}`);
    } catch (error) {
        console.log(`Database connection failed`, error.message);
        process.exit(1)
    }
}

export default connectDB