import {prisma} from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";
import bcrypt from 'bcrypt';

export default async function putUser(req:authRequest, res:Response) {
    console.log("1");
    const id = req.userId;
    const {name,email,password} = req.body;

    if (!id) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // 2. Valida se pelo menos um campo foi fornecido no corpo da requisição
    if (!name && !email && !password) {
        return res.status(400).json({ message: "Informe ao menos um campo (nome, e-mail ou senha) para atualizar." });
    }

    try{
        const updateData: { name?: string; email?: string; password?: string } = {};
        if(password) updateData.password = await bcrypt.hash(password, 10);
        if(name) updateData.name = name;
        if(email) updateData.email = email;
    
        await prisma.user.update({
            where:{id},
            data:updateData
        })

        res.status(200).send();
    }catch (error: any) {
        console.error("Erro ao atualizar usuário: ", error);

        // P2002 do Prisma = Tentativa de atualizar para um e-mail que já pertence a outro usuário
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "O e-mail informado já está em uso por outra conta." });
        }

        // P2025 do Prisma = ID do usuário não existe mais no banco
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(500).json({ message: "Erro interno no servidor ao atualizar usuário." });
    }
}