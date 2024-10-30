import express from "express";
import { PORT, url } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/books", booksRoutes);

//home page route
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("welcome to your first full stack app");
});

//connecting the database
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected successfuly");
    app.listen(PORT, () => {
      console.log(`I am listening in port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
