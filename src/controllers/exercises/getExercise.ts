import type { Prisma } from "../../../generated/prisma/client.js";
import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function getExercise(req: Request, res: Response) {
    const {name,force,level,category,equipment,primaryMuscles} = req.query;
    const where:Prisma.ExerciseWhereInput = {};

    if(name){
        where.name = {
            contains: name.toString().trim(),
            mode: "insensitive" 
        }
    }
    if(force){
        where.force = force.toString().trim();
    }
    if(level){
        where.level = level.toString().trim();
    }
    if(category){
        where.category = category.toString().trim();
    }
    if(equipment){
        where.equipment = {
            contains: equipment.toString().trim(),
            mode: "insensitive"
        }
    }
    if(primaryMuscles){
        where.primaryMuscles = {
            hasEvery: primaryMuscles.toString().split(",").map(m => m.trim())
        }
    }

    try {
        const exercise = await prisma.exercise.findMany({ where });
        res.json(exercise);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}