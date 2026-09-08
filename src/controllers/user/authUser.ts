import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default async function authUser(req:Request, res:Response) {
    const {email,password} = req.body;

    try{
        const user = await prisma.user.findUnique({where:{email}});

        if(!user){
            return res.status(401).json({ message: "E-mail ou senha inválidos." });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({ message: "E-mail ou senha inválidos." });
        }

        const secret = process.env.KEY;
        if (!secret) {
            throw new Error("Chave não configurada nas variáveis de ambiente.");
        }
        const token = jwt.sign({id: user.id}, secret, {expiresIn: "1d"});

        res.json({token})
    }catch{
        //fazer tratamento de erro depois
    }
}