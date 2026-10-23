import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";

export default async function getExerciseById(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;

    try{
        const exercise = await prisma.exercise.findUnique({
            where: {id}
        });

        if (!exercise) {
            return res.status(404).json({ message: "Exercício não encontrado." });
        }

        res.json(exercise);
    }
    catch(error){
        console.error("Erro ao buscar exercício por ID: ", error);
        
        return res.status(500).json({ message: "Erro interno no servidor." });
    }      
}