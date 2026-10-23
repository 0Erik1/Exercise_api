import {prisma} from "../../prisma.js";
import type {Response} from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function getUser(req:authRequest, res:Response) {
    const id = req.userId;

    if (!id) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try{
        const user = await prisma.user.findUnique({
            where:{id}
        })
        res.json({
            id:user?.id,
            name:user?.name,
            email:user?.email
        });
    }catch (error) {
        console.error("Erro ao buscar usuário: ", error);

        // 500 Internal Server Error para falhas de banco ou conexão
        return res.status(500).json({ message: "Erro interno no servidor ao buscar dados do usuário." });
    }
}