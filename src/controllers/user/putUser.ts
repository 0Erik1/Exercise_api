import {prisma} from "../../prisma.js";
import type { Response } from "express";
import type { authRequest } from "../../middlewares/authMiddleware.js";
import bcrypt from 'bcrypt';

export default async function putUser(req:authRequest, res:Response) {
    console.log("1");
    const id = req.userId;
    const {name,email,password} = req.body;

    try{
        const updateData: { name?: string; email?: string; password?: string } = {};
        if(password) updateData.password = await bcrypt.hash(password, 10);
        if(name) updateData.name = name;
        if(email) updateData.email = email;
    
        await prisma.user.update({
            where:{id},
            data:updateData
        })
        console.log("dps do update");
        res.status(200).send();
    }catch{
        //fazer tratamento de erro depois
    }
}