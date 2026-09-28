import { Router } from "express";
import postUserExercise from "../controllers/userExercise/postUserExercise.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getUserExercise from "../controllers/userExercise/getUserExercise.js";
import putUserExercise from "../controllers/userExercise/putUserExercise.js";
import deleteUserExercise from "../controllers/userExercise/deleteUserExercise.js";

const router = Router();

router.post("/", authMiddleware, postUserExercise);
router.get("/",authMiddleware,getUserExercise);
router.put("/:id",authMiddleware,putUserExercise);
router.delete("/:id",authMiddleware,deleteUserExercise)


export default router;