import {prisma} from "../../prisma.js";
import type { Response, Request } from "express";

export default async function postExercise(req:Request, res:Response) {
    const {id,name,force,level,category,equipment,primaryMuscles,mechanic,secondaryMuscles,instructions} = req.body;
    
    if(id && name){
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
        catch(error){
            //fazer o tratamento de erro depois
            console.log(error);
            res.status(500).json({
                message: "Erro ao criar exercício"
            });
        }
    }
    
}