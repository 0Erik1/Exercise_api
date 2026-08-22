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
    catch(error){
        console.log(error);
        //fazer tratamento de erro depois
    }
}