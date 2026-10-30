import {Router} from "express";
import getExercise from "../controllers/exercise/getExercise.js";
import getExerciseById from "../controllers/exercise/getExerciseById.js";
import deleteExercise from "../controllers/exercise/deleteExercise.js";
import postExercise from "../controllers/exercise/postExercise.js";
import putExercise from "../controllers/exercise/putExercise.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = Router();

router.get("/", getExercise);
router.get("/:id", getExerciseById);
router.delete("/:id",authMiddleware,adminMiddleware,deleteExercise);
router.post("/",authMiddleware,adminMiddleware, postExercise);
router.put("/:id",authMiddleware,adminMiddleware, putExercise);

export default router;