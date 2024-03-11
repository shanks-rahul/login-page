const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minlength:[3,"Name must be at least 3 characters"],
        maxlength:[20,"Name can't exceed 20 characters"]
    },
    username:{
        type:String,
        unique:true,
        lowercase: true,
        required: [true, "Username is required"],

    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:[true,"email already exist"]
    },
    password:{
        type:String,
        select:false,
        required:[true,'Password is required']
    },
    bio:{
        type:String,

    },
    forgotPasswordToken:{
        type:'String',
    },
    forgotPasswordExpiryDate:{
        type:'String'
    },

},{
    timestamps:true
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    return next();
})
userSchema.methods={
    generateJWTToken:async function(){
        return await jwt.sign(
            {id:this._id,username:this.username},
            process.env.SECRET,
            {
                expiresIn:'24h'
            }
        )
    },
    comparePassword:async function(password){
        return await bcrypt.compare(password,this.password);
    }
}

const User=new mongoose.model("User",userSchema);
module.exports=User;