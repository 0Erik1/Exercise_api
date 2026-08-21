import {prisma} from "../../prisma.js";
import type {Request, Response} from "express";

export default async function postUser(req:Request, res:Response){
    const {name,email,password} = req.body;

    try{
        if(name && email && password){
            await prisma.user.create({
                data:{
                    name,
                    email,
                    password
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