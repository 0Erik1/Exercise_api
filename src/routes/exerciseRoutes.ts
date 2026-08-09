import {Router} from "express";
import getExercise from "../controllers/exercises/getExercise.js";
import getExerciseById from "../controllers/exercises/getExerciseById.js";

const router = Router();

router.get("/", getExercise);
router.get("/:id", getExerciseById);

export default router;