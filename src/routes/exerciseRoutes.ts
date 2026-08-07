import {Router} from "express";
import getExercise from "../controllers/exercises/getExercise.js";

const router = Router();

router.get("/", getExercise);

export default router;