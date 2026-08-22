import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function deletExercise(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;
    //id de administrador para poder apagar os exercicios

    if(id){
        try{
            await prisma.exercise.delete({
                where:{
                    id: id
                }
            });
            res.status(204).send();
        }
        catch(error){
            //fazer tratamento de erro depois
            console.log("Erro ao deletar: ", error);
        }
    }
}
    