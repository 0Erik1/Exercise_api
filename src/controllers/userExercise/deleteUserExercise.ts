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
        return res.status(204).send();
    }catch (error) {
        console.error("Erro ao deletar registro de treino: ", error);

        return res.status(500).json({ message: "Erro interno no servidor ao deletar treino." });
    }
}   