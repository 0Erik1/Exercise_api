import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";

export default async function putUser(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;
    const {name,email,password} = req.body;

    try{
        await prisma.user.update({
            where:{id},
            data:{
                    name,
                    email,
                    password
                }
        })
        res.status(200).send();
    }catch{
        //fazer tratamento de erro depois
    }
}