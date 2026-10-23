import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function getUserExercise( req:authRequest, res:Response){
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try{
        const exrcises = await prisma.userExercise.findMany({
            where:{userId},
            include:{exerciseSet:true},
            orderBy:{dateTime:"desc"}
        })
        res.status(200).json(exrcises);
    }catch(error){
       console.error("Erro ao buscar treinos do usuário: ", error);

        return res.status(500).json({ message: "Erro interno no servidor ao buscar treinos." });
    }
}