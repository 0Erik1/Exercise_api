import type { Response, NextFunction } from "express";
import type { authRequest } from "./authMiddleware.js";
import { prisma } from "../prisma.js";

export default async function adminMiddleware(req:authRequest, res:Response, next: NextFunction){
    const id = req.userId;

    try{
        const user = await prisma.user.findUnique({where:{id}});

        if(!user){return res.status(404).json({ message: "Usuário não encontrado" });}
        if(user.admin){
            return next();
        }
        return res.status(403).json({ message: "Acesso negado. Requer perfil de administrador." });
    }catch(error){
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
    
}