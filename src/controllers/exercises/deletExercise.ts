import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function deletExercise(req:Request, res:Response) {
    const {id} = req.body;
 
    if(id){
        try{
            const delExercise = await prisma.exercise.delete({
                where:{
                    id: id
                }
            });
        }
        catch(error){
            //fazer tratamento de erro depois
            console.log("Erro: ", error);
        }
    }
}
    