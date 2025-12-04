import type { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";


export function middleware(req :Request,res : Response, next :NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }        
        const decoded = jwt.verify(token, process.env.CLERK_JWT_PUBLIC_KEY!);
        console.log("decoded :-> ",decoded)
        req.userId = decoded.sub as string;
        next()
    } catch (error) {
        console.log("error in middleware")
        console.error(error);
    }
}
