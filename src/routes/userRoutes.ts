import { Router } from "express";
import postUser from "../controllers/user/postUser.js";
import getUser from "../controllers/user/getUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import putUser from "../controllers/user/putUser.js";
import authUser from "../controllers/user/authUser.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/",postUser);
router.post("/login",authUser);

router.delete("/me",authMiddleware,deleteUser);
router.get("/me",authMiddleware,getUser);
router.put("/me",authMiddleware,putUser);

export default router;