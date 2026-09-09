import { prisma } from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function getUserExercise( req:authRequest, res:Response){
    const userId = req.userId;

    try{
        const exrcises = await prisma.userExercise.findMany({
            where:{userId},
            include:{exercise:true, exerciseSet:true},
            orderBy:{dateTime:"desc"}
        })
        res.status(200).json(exrcises);
    }catch{
        //tratamento de erro dps
    }
}