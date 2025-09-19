import { Router } from "express"
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { auth } from "../Middleware/auths.js";
import { authorizeRole } from "../Middleware/authorized.js";
const router = Router();

router.put("/:id",auth, authorizeRole("user","admin"), updateUser);
router.delete("/:id", deleteUser);
export default router;