import {prisma} from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function deleteUser(req:authRequest, res:Response){
    const id = req.userId;

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