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

app.get("/Users", (req, res) => {
  let sql = "SELECT * FROM Users"

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao registrar um usuario");
    } else {
      res.status(200).json(result.rows);
    }
  })
});

app.post("/Users", (req, res) => {
  const { description, name } = req.body;

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

app.put("/Users/:id", (req, res) => {
  const userId  = req.params.id;
  const { description, name } = req.body;

  let sql = "UPDATE Users SET description = $1, name = $2 WHERE id = $3";

  db.query(sql, [description, name, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao atualizar os dados desse usuario");
    } else {
      res.status(200).send("Dados atualizados com sucesso!");
    }
  });
})

app.delete("/Users/:id", (req, res) => {
  const userId = req.params.id;
  
  let sql = "DELETE FROM Users WHERE id = $1"

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao deletar um usuario");
    } else {
      res.status(200).send("Usuario deletado com sucesso!");
    }
  });

});

app.listen(port, console.log("Server On"));
