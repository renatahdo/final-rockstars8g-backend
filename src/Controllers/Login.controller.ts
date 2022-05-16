import { Request, Response, NextFunction } from "express";
import { User } from "../Models/User";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY_HASHED = process.env.SECRET_KEY_HASHED || "";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!password) return res.status(400).json({message: "Password is required"});
    if (!email) return res.status(400).json({message: "Email is required"});
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({message: "User not found"});
    if( user.password !== password) return res.status(400).json({message: "Incorrect password"});;
    const token = jwt.sign({_id: user._id, email, rol: user.type }, SECRET_KEY_HASHED, { expiresIn: "3h" });
    const userAuth = {
        email: user.email,
        token
    };
    return res.json(userAuth);
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => validateUserType(req, res, next, "admin");

export const validateUserType = (req: Request, res: Response, next: NextFunction, userType?: string) => {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ message: "You are unauthorized - No token" });
    jwt.verify(token, SECRET_KEY_HASHED, (error, decode) => {
        if (error) return res.status(500).json({ message: error.message });
        if (decode && typeof decode !== "string") {
            if (userType && userType !== decode.rol) {
                res.status(403).json({ message: "You are not admin - Forbidden" });
            } else {
                req.body.decode = decode;
                next();
            }
        }
    });
};