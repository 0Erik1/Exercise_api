import { Router } from "express";
import postUser from "../controllers/user/postUser.js";

const router = Router();

router.post("/",postUser);

export default router;