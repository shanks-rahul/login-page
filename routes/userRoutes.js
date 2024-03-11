const express=require("express");
const {register,signin,logout,getProfile} = require("../controllers/user.control");
const Router=express.Router();
const {isLoggedIn}=require("../middleware/auth.middleware");


Router.post("/signup",register);
Router.post("/signin",signin);
Router.get("/logout",logout);
Router.get("/getprofile:id",isLoggedIn,getProfile);
module.exports=Router;