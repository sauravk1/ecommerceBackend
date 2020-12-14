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

exports.signin = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {firstName,lastName,email,role,fullname}=user;
                res.status(200).json({
                    token,
                    user:{
                    firstName,lastName,email,role,fullname
                    }
                })

            }else{
                return res.status(500).json({message:"wrong credentials"})
            }

        }else{
            return res.status(400).json({message:"something went wrong"})
        }
    })
}

