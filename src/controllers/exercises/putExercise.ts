import {prisma} from "../../prisma.js";
import type { Response, Request } from "express";

export default async function putExercise(req:Request, res:Response) {
    const {id,name,force,level,category,equipment,primaryMuscles,mechanic,secondaryMuscles,instructions} = req.body;
    try{
        if(id){
            await prisma.exercise.update({
                where: {id:id},
                data: {
                    id,
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
        }
        res.status(200).send();
        
    }
    catch(error){
        console.log(error);
        //fazer tratamento de erro depois
    }
}