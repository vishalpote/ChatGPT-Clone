import {Router} from 'express';
import { getallUsers, logoutUser, userLogin, userSignup, verifyUser } from '../controller/user.controller';
import { loginValidator, signupValidator, validate } from '../middleware/validator';
import { verifyToken } from '../utils/genarettoken';

const userRouter=Router();

userRouter.get("/", getallUsers);
userRouter.post("/signup",validate(signupValidator), userSignup);
userRouter.post("/login",validate(loginValidator),userLogin);
userRouter.get("/auth-status",verifyToken,verifyUser);
userRouter.get("/logout",verifyToken,logoutUser);

export default userRouter;