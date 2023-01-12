import express from "express";
const userRouter = express.Router();
import { create } from "../controllers/private.js"
import { login, logout, register } from "../controllers/user.js";


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

export default userRouter