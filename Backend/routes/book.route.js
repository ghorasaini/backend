// // import { Router } from "express";
// // import {
// //   createBook,
// //   deleteBook,
// //   putBook,
// //   getBook,
// //   updateBook,
// // } from "../controllers/book.controller.js";
// // import { auth } from "../Middleware/auths.js";

// // const router = Router();

// // router.use(auth);

// // router.post("/", createBook);

// // router.put("/", putBook);

// // router.delete("/", deleteBook);

// // router.get("/", getBook);

// // router.get("/", (req, res) => {
// //   res.json(books);
// // });

// // export default router;

import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBookById,
  updateBook,
} from "../controllers/book.controller.js";
import { auth } from "../Middleware/auths.js";
const router = Router();
router.use(auth);
// http://localhost:8000/books/
router.post("/", createBook);
router.get("/", getBook);
// http://localhost:8000/books/1
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;



