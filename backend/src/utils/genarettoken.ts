import { signedCookie } from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constant';
 export const generateToken = (id: string, email: string, expiresIn: string):string => {
   const payload = { id, email };
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
   const token = jwt.sign(payload, process.env.JWT_SECRET, {
     expiresIn,
   });
   return token;
 };


 export const verifyToken=async(req:Request,res:Response,next:NextFunction)=>{
  const token=req.signedCookies[`${COOKIE_NAME}`];
  if(!token || token.trim()===""){
      return res.status(401).json({message:"token Not Recieved..!!"});
  }
    return new Promise<void>((resolve,reject)=>{
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      return jwt.verify(token,process.env.JWT_SECRET,(err:any,success:any)=>{
        if(err){
          reject(err);
          return res.status(401).json({message:"Token Expired..!!"})
        }else{
          ("Token Verification Success..!!");
          resolve();
          res.locals.jwtData=success;
          return next();
        }
      })
    })
 }
