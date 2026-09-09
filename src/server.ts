import express from "express";
import exerciseRoutes from "./routes/exerciseRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import userExerciseRouter from "./routes/userExerciseRouter.js"

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("hello world")
});

app.use("/exercise", exerciseRoutes);
app.use("/user", userRoutes);
app.use("/user-exercise", userExerciseRouter);

app.listen(8000, ()=> {
    console.log("Started");
});
