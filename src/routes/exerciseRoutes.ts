import {Router} from "express";
import getExercise from "../controllers/exercises/getExercise.js";
import getExerciseById from "../controllers/exercises/getExerciseById.js";
import deleteExercise from "../controllers/exercises/deleteExercise.js";
import postExercise from "../controllers/exercises/postExercise.js";
import putExercise from "../controllers/exercises/putExercise.js"

const router = Router();

router.get("/", getExercise);
router.get("/:id", getExerciseById);
router.delete("/",deleteExercise);
router.post("/", postExercise);
router.put("/", putExercise);

export default router;