import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";
import bcrypt from "bcrypt";

export default async function postUser(req:Request, res:Response){
    const {name,email,password} = req.body;

    try{
        const userExists = await prisma.user.findUnique({
            where: { email }
        });
        if (userExists) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        if(name && email && password){
            await prisma.user.create({
                data:{
                    name,
                    email,
                    password: passwordHash
                }
            })
            res.status(201).send();
        }
        else{
            res.status(400).send();
        }
    }
    catch{
        //fazer tratamento de erro depois
    }
    
}