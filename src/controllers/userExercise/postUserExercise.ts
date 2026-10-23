import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function postUserExercise(req:authRequest, res:Response) {
    const userId = req.userId;
    const {exerciseId, sets} = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    if (!exerciseId || !sets || !Array.isArray(sets) || sets.length === 0) {
        return res.status(400).json({ 
            message: "É necessário informar 'exerciseId' e um array 'sets' com ao menos uma série." 
        });
    }

    try{
        if(userId && exerciseId && sets){
            await prisma.userExercise.create({
                data:{
                    userId,
                    exerciseId,
                    exerciseSet:{create:sets}
                }
            })
            return res.status(201).send();
        }
        return res.status(400).send();

    }catch (error: any) {
        console.error("Erro ao registrar treino: ", error);

        // P2003 do Prisma = Falha de Chave Estrangeira (ex: exerciseId informado não existe no banco)
        if (error.code === 'P2003') {
            return res.status(404).json({ message: "O exercício informado não foi encontrado no catálogo." });
        }

        return res.status(500).json({ message: "Erro interno no servidor ao registrar treino." });
    }
}