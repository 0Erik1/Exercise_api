import {prisma} from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function deleteUser(req:authRequest, res:Response){
    const id = req.userId;

    if (!id) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try{
        await prisma.user.delete({
            where: {id}
        })
        res.status(204).send();
    }
    catch (error: any) {
        console.error("Erro ao deletar usuário: ", error);

        // P2025 do Prisma = Usuário não encontrado no banco (ex: já deletado previamente)
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Erro genérico do servidor/banco
        return res.status(500).json({ message: "Erro interno no servidor ao deletar usuário." });
    }      
}