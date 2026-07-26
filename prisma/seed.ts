import fs from "fs";
import path from "path";
import { prisma } from "../src/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

const caminho = path.join("prisma","exercises-ptbr-full-translation.json");
const texto = fs.readFileSync(caminho, "utf-8");

const exercises = JSON.parse(texto);

try{
    for(const item of exercises){
        try{
            await prisma.exercise.create({
                data: {
                    id: item.id,
                    name: item.name,
                    force: item.force,
                    level: item.level,
                    mechanic: item.mechanic,
                    equipment: item.equipment,
                    primaryMuscles: item.primaryMuscles,
                    secondaryMuscles: item.secondaryMuscles,
                    instructions: item.instructions,
                    category: item.category,
                }
            })
        }
        catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
                console.log(`Exercise "${item.id}" already exists.`);
                continue;
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(error.code);
                console.log(error.message);
                console.log(error.meta);
            }
            throw error;
        }
    }
}
finally{
    await prisma.$disconnect();
}