import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function postUserExercise(req:authRequest, res:Response) {
    const userId = req.userId;
    const {exerciseId, sets} = req.body;

    try{
        if(userId && exerciseId && sets){
            await prisma.userExercise.create({
                data:{
                    userId,
                    exerciseId,
                    exerciseSet:{create:sets}
                }
            })
            return res.status(201).send();
        }
        return res.status(400).send();

    }catch{
        //fazer tratamento de erro dps
    }
}