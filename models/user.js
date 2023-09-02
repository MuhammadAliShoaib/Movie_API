const mongoose = require("mongoose");
const Joi = require("joi")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:255
    },
    isAdmin : {
        type:Boolean,
        default:false
    }
})

userSchema.methods.generateAuthToken = function(){
    const token  = jwt.sign({_id:this._id, isAdmin:this.isAdmin},process.env.secret);
    return token;
}


const User = mongoose.model("user",userSchema);

const validateUser = (user)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(20).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;