import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

interface ExerciseSetInput {
    repetitions?: number;
    weight: number;
    time: number;
}

export default async function putUserExercise(req: authRequest, res: Response) {
    const userId = req.userId;
    const { id } = req.params as {id:string}; 
    const { exerciseId, sets }: { exerciseId?: string; sets?: ExerciseSetInput[] } = req.body;

    if (!userId || !id) {
        return res.status(400).json({ message: "ID do registro não fornecido." });
    }

    try {
        const existingUserExercise = await prisma.userExercise.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!existingUserExercise) {
            return res.status(404).json({ message: "Registro de treino não encontrado." });
        }

        // 2. Se as séries foram enviadas, atualizamos dentro de uma transação
        if (sets && Array.isArray(sets)) {
            await prisma.$transaction([

                prisma.exerciseSet.deleteMany({
                    where: { userExerciseId: id }
                }),

                prisma.userExercise.update({
                    where: { id },
                    data: {
                        ...(exerciseId && { exerciseId }),
                        exerciseSet: {
                            create: sets
                        }
                    }
                })
            ]);
        } else if (exerciseId) {

            await prisma.userExercise.update({
                where: { id },
                data: { exerciseId }
            });
        }

        return res.status(200).json({ message: "Treino atualizado com sucesso." });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar registro de treino." });

    }
}