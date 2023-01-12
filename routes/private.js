import express from "express";
const privateRouter = express.Router();
import { create } from "../controllers/private.js"
import { authentication } from "../middleware/authentication.js";



privateRouter.get('/private',[authentication], create);

export default privateRouter