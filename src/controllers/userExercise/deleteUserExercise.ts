import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function deleteUserExercise(req: authRequest, res:Response) {
    const userId = req.userId;
    const id = req.params.id as string;    

    if(!userId || !id){
            return res.status(400).json({ message: "ID do registro não fornecido." });
        }

    try{
        const userExercise = await prisma.userExercise.findFirst({
            where:{id,userId}
        });
        if(!userExercise){
            return res.status(404).json({ message: "Registro de treino não encontrado." });
        }
        await prisma.$transaction([
            prisma.exerciseSet.deleteMany({
                where: { userExerciseId: id }
            }),
            prisma.userExercise.delete({
                where: { id }
            })
        ]);
        return res.status(200).json({ message: "Treino removido com sucesso." });
    }catch (error) {
        // Bloco catch obrigatório para tratar falhas e fechar a requisição
        return res.status(500).json({ message: "Erro ao deletar treino." });
    }
}   