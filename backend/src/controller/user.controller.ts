import { NextFunction,Request,Response } from "express";
import User from "../model/user.model";
import bcrypt from 'bcryptjs';
import {generateToken} from "../utils/genarettoken";
import { COOKIE_NAME } from "../utils/constant";


export const userSignup = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const {name,email,password}=req.body;
    const exist = await User.findOne({email});
    if(exist){
        return res.status(400).json({message:"User ALready Exists..!!"});
    }

    const hashpass = await bcrypt.hash(password,10);

     res.clearCookie(COOKIE_NAME, {
       httpOnly: true,
       signed: true,
       domain: "localhost",
       path: "/",
     });

    const users=await User.create({name,email,password:hashpass});
     const token = generateToken(users._id.toString(), users.email, "7d");
     const expires = new Date();
     expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
     res.cookie(COOKIE_NAME, token, {
       path: "/",
       domain: "localhost",
       httpOnly: true,
       expires,
       signed: true,
     });
    return res
      .status(200)
      .json({ message: "Signin Successfull..!!", name: users.name, email: users.email });
  } catch (error: any) {
    (error.message);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};





export const userLogin = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User Not Exists..!!" });
    }

    const compairpass = await bcrypt.compare(password, user.password);
    if(!compairpass){
      return res.status(401).json({message:"Password Does Not Match..!!"});
    };

    res.clearCookie(COOKIE_NAME,{
      httpOnly: true,
      signed: true,
      domain:'localhost',
      path:'/'
    });

    const token = generateToken(user._id.toString(), user.email, "7d");
    let expires=new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      expires
    });
  
    return res
      .status(201)
      .json({ message: "user loggedIn successfully..!!", name: user.name,email:user.email });
  } catch (error: any) {
    (error.message);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};



export const verifyUser = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Exists Or Token Is Malfunctioned..!!" });
    }
    if(user._id.toString()!==res.locals.jwtData.id){
      return res.status(401).json({message:'Permission Did Not Match..!!'})
    }
    return res
      .status(201)
      .json({ message: "user loggedIn successfully..!!", name: user.name,email:user.email });
  } catch (error: any) {
    (error.message);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};




export const getallUsers=async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const users=await User.find();
        return res.status(200).json({message:"Ok",users});
    } catch (error:any) {
        (error.message);
        return res.status(200).json({message:"Error",cause:error.message});
    }
}


export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Exists Or Token Is Malfunctioned..!!" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission Did Not Match..!!" });
    }
     res.clearCookie(COOKIE_NAME, {
       httpOnly: true,
       signed: true,
       domain: "localhost",
       path: "/",
     });
    return res
      .status(201)
      .json({
        message: "user logged Out successfully..!!",
      });
  } catch (error: any) {
    (error.message);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};