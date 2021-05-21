const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const dbObj = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 1380;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

getDb = () => {
  fs.readFileSync(path.join(__dirname, "/db/db.json"));
};

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  // console.log("response", path.join(__dirname, "./db/db.json"));
  res.json(dbObj);
});

app.post("/api/notes", (req, res) => {
  const dbObj = require("./db/db.json");
  console.log(dbObj);
  const newNote = req.body;
  newNote.id = dbObj.length > 0 ? dbObj[dbObj.length - 1].id + 1 : 1;
  dbObj.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(dbObj), function (err) {
    if (err) throw err;
    console.log("note saved");
  });
  res.send("newNote");
});

app.delete("/api/notes/:id", (req, res) => {
  const idNum = req.params.id;
  // console.log("idnum", idNum);
  const dbObj = require("/db/db.json");
  // console.log("dbobj", dbObj);
  const newObj = dbObj.filter((item) => item.id != idNum);
  fs.writeFile("./db/db.json", JSON.stringify(newObj), function (err) {
    if (err) throw err;
    console.log("note deleted");
  });
  res.send("newObj");
});

app.get("*", (req, res) => {
  const url = req.url === "/" ? "index.html" : req.url;
  res.sendFile(path.join(__dirname, `/public${url}`));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
