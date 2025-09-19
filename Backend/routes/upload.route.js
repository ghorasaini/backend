import { Router } from "express";
import { upload } from "../Middleware/upload.js";
import { uploadFile } from "../controllers/upload.controller.js";
const router = Router ();

router.post ("/single", upload.fields([
    {


    name: "photo",
    },
]), 

uploadFile
);

export default router;