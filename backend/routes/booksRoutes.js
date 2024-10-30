import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Route to get all the books
router.get("/", async (req, res) => {
  try {
    const AllBooks = await Book.find({});
    return res.status(200).json({
      count: AllBooks.length,
      data: AllBooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Getting one book from the database by Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please fill all the requested fields" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }

    return res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bookToDelete = await Book.findByIdAndDelete(id);

    if (!bookToDelete) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Rout to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "please fill all the fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
