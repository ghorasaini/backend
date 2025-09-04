import { Router } from "express"
import { createUser } from "../controlers/users.controller.js"
const router = Router();
router.post("/", createUser);
export default router;