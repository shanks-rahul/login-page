const express=require("express");
const AppErr=require("../util/user.error");
const User=require("../models/userModel");
const cookieOption={
    maxAge:24*60*60*1000,
    secure:true,
    httpOnly:true
}


const register=async (req,res,next)=>{
    try{
        const {name,username,email,password,bio}=req.body;
    if(!name || !username || !email || !password){
        return next(new AppErr("404","all fields are required"));
    }
    const user=await User.findOne({email});
    if(user){
        return next(new AppErr('400','Email already exists'));
    }
    const newUser=await User.create({
        name,
        username,
        email,
        password,
        bio
    });
    if(!newUser){
        return next(new AppErr('400','Failed To Register'));
    }
    await newUser.save();
    newUser.password=undefined;
    const token=await newUser.generateJWTToken();
    res.cookie('token',token,cookieOption);
    res.status(200).json({
        sucess:true,
        message:"user registered successfully",
        data:newUser
    })
    }catch(e){
        return next(new AppErr("400",e.message));
    }
}
const signin=async (req,res,next)=>{
    try{
        const{email,password}=req.body;
    if(!email||!password){
        return next(new AppErr('400','All Fields Are Required'))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user || !user.comparePassword(password)){
        return next(new AppErr('400','invalid credentials'));
    }
    user.password=undefined;
    const token=await user.generateJWTToken();
    res.cookie("token",token,cookieOption);
    res.status(200).json({
        success:true,
        message:"logged in sucesssfully",
        data:user
    })
    }catch(e){
        return next(new AppErr("400","unable"));
    }
}
const logout=async(req,res,next)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"logged out successfully"
    })
};
const getProfile=async (req,res,next)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        res.status(200).json({
            success:true,
            message:"user details",
            user
        })
    }catch(e){
        return next(new AppErr(400,e.message));
    }


}


module.exports={
     register,
    signin,
    logout,
    getProfile
}