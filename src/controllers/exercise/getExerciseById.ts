import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";

export default async function getExerciseById(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;

    try{
        const exercise = await prisma.exercise.findUnique({
            where: {id}
        })
        res.json(exercise);
    }
    catch{
        //fazer tratamento de erro depois
    }      
}