import {prisma} from "../../prisma.js";
import type { Response, Request } from "express";

export default async function postExercise(req:Request, res:Response) {
    const {id,name,force,level,category,equipment,primaryMuscles,mechanic,secondaryMuscles,instructions} = req.body;
    
    if (!id || !name) {
        return res.status(400).json({ message: "Os campos 'id' e 'name' são obrigatórios." });
    }
    try{
        await prisma.exercise.create({
            data: 
                {
                id:id,
                name:name,
                force:force,
                level:level,
                category:category,
                equipment:equipment,
                primaryMuscles:primaryMuscles,
                mechanic:mechanic,
                secondaryMuscles:secondaryMuscles,
                instructions:instructions
            }
        });
        res.status(201).send();
    }
    catch (error: any) {
        console.error("Erro ao criar exercício:", error);

        // P2002 do Prisma = Registro com ID duplicado
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "Já existe um exercício cadastrado com este ID." });
        }

        return res.status(500).json({ message: "Erro interno no servidor ao criar exercício." });
    }
}