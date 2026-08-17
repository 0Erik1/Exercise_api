import {Router} from "express";
import getExercise from "../controllers/exercises/getExercise.js";
import getExerciseById from "../controllers/exercises/getExerciseById.js";
import deletExercise from "../controllers/exercises/deletExercise.js";

const router = Router();

router.get("/", getExercise);
router.get("/:id", getExerciseById);
router.delete("/",deletExercise);

export default router;