const AppErr=require("../util/user.error");
const jwt=require("jsonwebtoken");
const isLoggedIn=async (req,res,next)=>{
    const token=res.cookies;
    if(!token){
        return next(new AppErr("400","unauthenticated please login again"))
    }
    const userDetails=await jwt.verify(token,process.env.SECRET);
    req.user=userDetails;
    next();
}
module.exports={isLoggedIn};