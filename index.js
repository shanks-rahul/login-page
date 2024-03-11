
const app=require("./app");
require('dotenv').config();
require("./db/connection");

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})