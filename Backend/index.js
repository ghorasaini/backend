import express from "express";
import bookRoutes from "./routes/book.route.js";
import { connectDB } from "./config/db.js";
import usersRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js"
import uploadRoutes  from "./routes/upload.route.js";

const app = express();
connectDB();
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/uploads",uploadRoutes)

app.use("/users", usersRoutes);
app.use("/auth",authRoutes)

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

// // MiddleWare
// //  is like a bridge between the request
// // comming from  client and response sent by server
// //  function which has req res next
