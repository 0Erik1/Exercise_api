import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function deleteExercise(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;
    
        try{
            await prisma.exercise.delete({
                where:{
                    id: id
                }
            });
            res.status(204).send();
        }
        catch (error: any) {
            console.log("Erro ao deletar: ", error);

        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Exercício não encontrado." });
        }

        return res.status(500).json({ message: "Erro interno ao deletar o exercício." });
    }
}
    