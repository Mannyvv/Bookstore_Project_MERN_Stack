import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/booksModel.js";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN tutorial");
});

// Books route to create book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(202).send(book)


  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
