import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";
import bcrypt from "bcrypt";

export default async function postUser(req:Request, res:Response){
    const {name,email,password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
    }

    try{
        const userExists = await prisma.user.findUnique({
            where: { email }
        });
        if (userExists) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        if(name && email && password){
            await prisma.user.create({
                data:{
                    name,
                    email,
                    password: passwordHash
                }
            })
            res.status(201).send();
        }
    }
    catch (error: any) {
        console.error("Erro ao cadastrar usuário: ", error);

        // P2002 do Prisma = Erro de unicidade (caso aconteça condição de corrida no e-mail)
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "E-mail já cadastrado." });
        }

        return res.status(500).json({ message: "Erro interno no servidor ao cadastrar usuário." });
    }
    
}