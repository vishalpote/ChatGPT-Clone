import { NextFunction, Request, Response } from 'express';
import {body,Result,ValidationChain,validationResult} from 'express-validator';


export const validate=(validations:ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }

        }
            const errors=validationResult(req);
            if(errors.isEmpty()){
                return next();
            }
            const results=errors.array()
            return res.status(422).json({errors:results})
    }
}



export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email Is Required..!!"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password at least 5 characters..!!"),
];

export const signupValidator=[
    body("name").notEmpty().withMessage("name Is Required..!!"),
    ...loginValidator
]


export const chatcomplationValidator=[
    body("message").notEmpty().withMessage("Message Is Required..!!")
]


