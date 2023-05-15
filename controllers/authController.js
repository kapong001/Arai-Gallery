import userModel from "../models/userModel.js";
import {comparePassword, hashPassword}  from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try{
        const {name, email ,contact ,password} = req.body;
        //validations 
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if(!contact){
            return res.send({error:'Contact is required'})
        }
        if(!password){
            return res.send({error:'Password is required'})
        }

        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name, 
            email,
            contact,
            password : hashedPassword ,
        }).save();

        res.status(201).send({
            success:true,
            message:"User Register Succesfully",
            user,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error,
        })
    }
};

//POST LOGIN
export const loginController = async (req, res) =>{
    try{
        const {email, password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or passsword'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not resgistered',
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success:true,
            message:"login succesfully",
            user:{
                name: user.name,
                email: user.email,
                contact: user.contact,
            },
            token,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });   
    }
};

//test controller 
export const testController = (req, res) =>{
    res.send('Protected Route');
}
