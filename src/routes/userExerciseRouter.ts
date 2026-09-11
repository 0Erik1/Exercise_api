import { Router } from "express";
import postUserExercise from "../controllers/userExercise/postUserExercise.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getUserExercise from "../controllers/userExercise/getUserExercise.js";

const router = Router();

router.post("/", authMiddleware, postUserExercise);
router.get("/",authMiddleware,getUserExercise);


export default router;