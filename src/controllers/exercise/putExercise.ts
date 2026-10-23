import {prisma} from "../../prisma.js";
import type { Response, Request } from "express";

export default async function putExercise(req:Request<{id:string}>, res:Response) {
    const id = req.params.id;
    const {name,force,level,category,equipment,primaryMuscles,mechanic,secondaryMuscles,instructions} = req.body;
    try{
          await prisma.exercise.update({
                where: {id},
                data: {
                    name,
                    force,
                    level,
                    category,
                    equipment,
                    primaryMuscles,
                    mechanic,
                    secondaryMuscles,
                    instructions
                }
            });
        res.status(200).send(); 
    }
    catch (error: any) {
        console.error("Erro ao atualizar exercício:", error);

        // P2025 do Prisma = Registro não encontrado para atualização
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Exercício não encontrado." });
        }

        // Erro genérico no banco ou servidor
        return res.status(500).json({ message: "Erro interno ao atualizar o exercício." });
    }
}