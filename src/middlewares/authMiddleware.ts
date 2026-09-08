import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request{
    userId?: string;
}

export default async function authMiddleware(req:authRequest, res:Response, next: NextFunction){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if(!token){
        return res.status(401).send()
    }
    try{
        const secret = process.env.KEY
        if(!secret){
            throw new Error("Chave não configurada nas variáveis de ambiente.");
        }

        const decoded = jwt.verify(token, secret) as { id: string }
        Object.assign(req, {userId:decoded.id})
        console.log("antes do next", req.userId)
        return next();
    }catch(error){
        return res.status(401).json({ message: "Token inválido." });
    }
    
}