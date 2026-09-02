import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";

export default async function getUser(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;

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