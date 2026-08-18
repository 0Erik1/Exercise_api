import {Router} from "express";
import getExercise from "../controllers/exercise/getExercise.js";
import getExerciseById from "../controllers/exercise/getExerciseById.js";
import deleteExercise from "../controllers/exercise/deleteExercise.js";
import postExercise from "../controllers/exercise/postExercise.js";
import putExercise from "../controllers/exercise/putExercise.js"

const router = Router();

router.get("/", getExercise);
router.get("/:id", getExerciseById);
router.delete("/",deleteExercise);
router.post("/", postExercise);
router.put("/", putExercise);

export default router;