const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log(`connected to database ${process.env.DATABASE_URL}`);
}).catch(e=>{
    console.log("connection failed");
})
