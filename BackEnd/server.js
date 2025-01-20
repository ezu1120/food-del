import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app = express()
const port = process.env.PORT || 4000



// middleware
app.use(express.json())
app.use(cors())
// db connection
connectDB();



// api endpoints
app.use("/api/food",foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)



app.get("/", (req, res) => {
    res.send("API Working")
})



app.listen(port, () => {
    console.log(`server Started on http://localhost:${port}`)
})
// mongodb+srv://ezu1120:<db_password>@cluster0.q3wyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0