const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : null,
    ].join(" ");
  })
);

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, res) => {
  res.json(data);
  res.status(200).end();
});

app.get("/info", (_, res) => {
  const date = new Date();
  res.write(`Phone book has ${data.length} people\n`);
  res.write(date.toUTCString());
  res.status(200).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const person = data.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  data = data.filter((person) => person.id !== id);
  res.status(200).end();
});

app.post("/api/persons", (req, res) => {
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
  const names = data.map((person) => person.name);
  if (names.includes(body.name)) {
    return res.status(400).json({
      error: "Name already exists.",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 100_000_000),
    name: body.name,
    number: body.number,
  };
  data = data.concat(person);
  res.json(person);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
