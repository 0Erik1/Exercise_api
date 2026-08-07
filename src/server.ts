import express from "express";
import exerciseRoutes from "./routes/exerciseRoutes.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("hello world")
});

app.use("/exercise", exerciseRoutes);

app.listen(8000, ()=> {
    console.log("Started");
});
