import UserModel from '../Model/User.model.js';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;



export async function addUser(req, res) {

const { email, password } = req.body;

try{
    const existUser = await UserModel.find({ email });
    if(existUser.length >0){
        return res.status(400).json({message: "User alreayd exist"});
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        email,
        password: hashed
    });

    await newUser.save();
    res.status(201).json({message: "User Created Successfully", EmailId: email,  UserId: newUser._id});
}
catch (error) {
    res.status(500).json({message: error.message});
}

};


export async function loginUser( req, res) {
     const { email, password } = req.body;
     try {

        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(401).json({message: " Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const token = jwt.sign({UserId: user._id}, JWT_SECRET, {expiresIn: '7h'});

        res.status(200).json({message: "Login Succssful", token, UserId: user._id, EmailId: user.email});   

     }
        catch (error) {
            res.status(500).json({message: error.message});
        }
}