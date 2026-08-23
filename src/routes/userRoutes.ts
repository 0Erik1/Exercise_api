import { Router } from "express";
import postUser from "../controllers/user/postUser.js";
import getUser from "../controllers/user/getUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import putUser from "../controllers/user/putUser.js";

const router = Router();

router.post("/",postUser);
router.delete("/:id",deleteUser);
router.get("/:id",getUser);
router.put("/:id",putUser);

export default router;