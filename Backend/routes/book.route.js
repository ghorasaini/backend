import { Router } from "express";
import {
  createBook,
  getBook,
  deleteBook,
  putBook,
} from "../controlers/book.controller.js";
import { auth } from "../Middleware/auths,js";

const router = Router();

router.use(auth);

router.post("/", createBook);

router.put("/", putBook);

router.delete("/", deleteBook);

router.get("/", putBook);

router.get("/", (req, res) => {
  res.json(books);
});

export default router;
