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
        return res.status(400).json({ message: "ID do registro não fornecido ou usuário não autenticado." });
    }

    const hasValidSets = Array.isArray(sets) && sets.length > 0;
    if (!exerciseId && !hasValidSets) {
        return res.status(400).json({ 
            message: "Informe ao menos 'exerciseId' ou um array 'sets' com dados para atualizar." 
        });
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

    } catch (error: any) {
        console.error("Erro ao atualizar registro de treino: ", error);

        // P2003 do Prisma = O exerciseId informado não existe na tabela de exercícios
        if (error.code === 'P2003') {
            return res.status(404).json({ message: "O exercício informado não foi encontrado no catálogo." });
        }

        return res.status(500).json({ message: "Erro interno no servidor ao atualizar treino." });
    }
}