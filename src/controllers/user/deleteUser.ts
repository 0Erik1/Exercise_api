import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function deleteUser(req:Request<{id:string}>, res:Response){
    const {id} = req.params;

    try{
        await prisma.user.delete({
            where: {id}
        })
        res.status(204).send();
    }
    catch{
        //fazer tratamento de erro depois
    }   
}