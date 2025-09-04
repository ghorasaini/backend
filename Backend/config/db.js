import mongoose  from "mongoose";
const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://bimalghorasaini730_db_user:Hello@cluster0.ng5yhlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected");
    }catch (error) {
        console.log("Error While connect DB", error.message);
    }
};

export { connectDB }; 