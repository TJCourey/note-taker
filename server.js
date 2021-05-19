const express = require("express");
const db = require("./db/db.json");
const index = require("./public/index.html");
const notes = require("./public/notes.html");
const css = require("./public/assets/css/style.css");
const index = require("./public/assets/js/index.js");

const app = express();
const PORT = 1380;

app.get("/", (req, res) => {
  res.send(index);
});
app.get("/notes", (req, res) => {
  res.send(index);
});
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
