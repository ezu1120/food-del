import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://ezu1120:10446333@cluster0.q3wyj.mongodb.net/food-del'
     ) .then(()=>console.log("DB Connected"));
 }