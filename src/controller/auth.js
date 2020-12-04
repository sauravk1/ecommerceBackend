const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message:"User already Registered"
        });

        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            username:Math.random().toString(),
            password
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:"something went wrong"
                });
            }
            if(data){
                return res.status(201).json({
                    message:"User created successfully"
                });
            }
        })
        

    })
}