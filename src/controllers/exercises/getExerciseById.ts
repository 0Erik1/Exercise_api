import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";

export default async function getExerciseById(req:Request, res:Response) {
    const {id} = req.params;
    if(id){
        const idStr = id.toString().trim();
        const exercise = await prisma.exercise.findUnique({
            where: {
                id : idStr
            }
        })
        res.json(exercise);
    }
}