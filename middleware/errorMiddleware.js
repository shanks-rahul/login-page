const errorMiddleware=async (err,req,res,next)=>{
    return await res.status(500).json({
        sucess:false,
        message:err.message,
        stack:err.stack

    })
}
module.exports=errorMiddleware;