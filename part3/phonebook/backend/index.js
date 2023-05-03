require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

// Middleware
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/api/persons", (_, res, next) => {
  Person.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => next(error));
});

app.get("/info", async (_, res) => {
  try {
    const date = new Date();
    const personCount = await Person.collection.countDocuments();
    res
      .status(200)
      .send(`Phonebook has ${personCount} people\n${date.toUTCString()}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((_) => {
      res.status(200).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing.",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "Number missing.",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.status(200).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use((_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
