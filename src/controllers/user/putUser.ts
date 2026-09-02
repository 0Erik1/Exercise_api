import {prisma} from "../../prisma.js";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';

export default async function putUser(req:Request<{id:string}>, res:Response) {
    const {id} = req.params;
    const {name,email,password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);


    try{
        await prisma.user.update({
            where:{id},
            data:{
                    name,
                    email,
                    password:passwordHash
                }
        })
        res.status(200).send();
    }catch{
        //fazer tratamento de erro depois
    }
}