import {prisma} from "../../prisma.js";
import type {Response} from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";

export default async function getUser(req:authRequest, res:Response) {
    const id = req.userId;

    try{
        const user = await prisma.user.findUnique({
            where:{id}
        })
        res.json({
            id:user?.id,
            name:user?.name,
            email:user?.email
        });
    }catch{
        //fazer o tratamento de erro depois
    }
}