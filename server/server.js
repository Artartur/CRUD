const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();

const { Pool } = require("pg");

app.use(cors());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "password",
  port: 5432,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", (req, res) => {
  const { description } = req.body;
  const { name } = req.body;

  let sql = "INSERT INTO Users (description, name) VALUES ($1, $2)";

  db.query(sql, [description, name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao registrar um usuario");
    } else {
      res.status(200).send("Usuario cadastrado com sucesso!");
    }
  });
});

// app.put();

// app.delete();

app.listen(port, console.log("Server On"));
