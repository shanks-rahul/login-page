const express=require('express');
require('dotenv').config();
const app=express();
const cookieParser=require("cookie-parser");
const Router=require("./routes/userRoutes");
const bodyParser=require("body-parser");
const cors=require("cors");
const errorMiddleware=require("./middleware/errorMiddleware");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials: true
}))

app.use("/ping",(req,res)=>{
    res.send("PONG")
})
app.use("/api",Router);
app.use(errorMiddleware);

module.exports=app;